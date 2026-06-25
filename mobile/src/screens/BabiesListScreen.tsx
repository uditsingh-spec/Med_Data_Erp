import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl, StyleSheet, Image, Modal, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, Search, LogOut, Pencil, Trash2, Users, ArrowRight } from 'lucide-react-native';
import api from '../services/api';
import { getDB } from '../services/db';
import { useAuthStore } from '../store/useAuthStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GlobalSyncBanner } from '../components/GlobalSyncBanner';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BabiesList'>;

interface Baby {
  _id: string;
  displayId: string;
  motherName: string;
  gender: string;
  weight: number;
  motherAge?: number;
  motherImage?: string;
  skinForehead?: number;
  skinSternum?: number;
  termStatus?: string;
  dob?: string;
  registeredAt?: string;
  isTwin?: boolean;
  twinLabel?: string;
}

interface GroupedBaby extends Baby {
  isGroup?: boolean;
  twins?: Baby[];
}

const formatDateDDMMYYYY = (dateStr: string | undefined) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function BabiesListScreen() {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [twinsOnly, setTwinsOnly] = useState(false);
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const navigation = useNavigation<NavigationProp>();
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const fetchBabies = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      let queryUrl = `/babies?limit=50&search=${search}&sort=${sort}`;
      if (genderFilter) queryUrl += `&gender=${genderFilter}`;
      if (twinsOnly) queryUrl += `&isTwin=true`;
      
      const response = await api.get(queryUrl);
      setBabies(response.data.data);

      const db = getDB();
      const stringifiedData = JSON.stringify(response.data.data || []);
      await db.runAsync('INSERT OR REPLACE INTO cache (key, data) VALUES (?, ?)', 'babies_list', stringifiedData);
    } catch (error: any) {
      if (!error.response) {
        try {
          const db = getDB();
          const cached = await db.getFirstAsync<{data: string}>('SELECT data FROM cache WHERE key = ?', 'babies_list');
          let localBabies = cached ? JSON.parse(cached.data) : [];
          
          const pending = await db.getAllAsync<any>("SELECT * FROM sync_queue WHERE method = 'post' AND url = '/babies'");
          
          let pendingBabies: any[] = [];
          pending.forEach(p => {
             const payload = JSON.parse(p.payload_json);
             const now = new Date().toISOString();
             if (payload.isTwin === 'true' || payload.isTwin === true) {
                pendingBabies.push({
                   ...payload,
                   _id: p.temp_id + '-A',
                   displayId: `Pending-${p.temp_id?.substring(0,4)}-A`,
                   motherName: payload.motherName || 'Unknown',
                   motherAge: payload.motherAge || 0,
                   gender: payload.genderA || 'Unknown',
                   weight: payload.weightA || 0,
                   skinForehead: payload.skinForeheadA,
                   skinSternum: payload.skinSternumA,
                   isTwin: true,
                   twinLabel: 'A',
                   motherImage: p.image_uri,
                   isPending: true,
                   registeredAt: now,
                   createdAt: now
                });
                pendingBabies.push({
                   ...payload,
                   _id: p.temp_id + '-B',
                   displayId: `Pending-${p.temp_id?.substring(0,4)}-B`,
                   motherName: payload.motherName || 'Unknown',
                   motherAge: payload.motherAge || 0,
                   gender: payload.genderB || 'Unknown',
                   weight: payload.weightB || 0,
                   skinForehead: payload.skinForeheadB,
                   skinSternum: payload.skinSternumB,
                   isTwin: true,
                   twinLabel: 'B',
                   motherImage: p.image_uri,
                   isPending: true,
                   registeredAt: now,
                   createdAt: now
                });
             } else {
                pendingBabies.push({
                   ...payload,
                   _id: p.temp_id,
                   displayId: `Pending-${p.temp_id?.substring(0,4)}`,
                   motherName: payload.motherName || 'Unknown',
                   motherAge: payload.motherAge || 0,
                   gender: payload.gender || 'Unknown',
                   weight: payload.weight || 0,
                   isTwin: false,
                   motherImage: p.image_uri,
                   isPending: true,
                   registeredAt: now,
                   createdAt: now
                });
             }
          });
          
          let allBabies = [...pendingBabies, ...localBabies];
          
          if (search) {
             const s = search.toLowerCase();
             allBabies = allBabies.filter(b => b.displayId?.toLowerCase().includes(s) || b.motherName?.toLowerCase().includes(s));
          }
          if (genderFilter) {
             allBabies = allBabies.filter(b => b.gender === genderFilter);
          }
          if (twinsOnly) {
             allBabies = allBabies.filter(b => b.isTwin);
          }
          
          allBabies.sort((a, b) => {
             const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
             const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
             return sort === 'oldest' ? tA - tB : tB - tA;
          });
          
          setBabies(allBabies);
        } catch (dbErr) {
          console.error('Failed to load from cache', dbErr);
        }
      } else {
        console.error('Failed to fetch babies', error);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBabies();
  }, [search, genderFilter, twinsOnly, sort]);

  useEffect(() => {
    const { DeviceEventEmitter } = require('react-native');
    const sub = DeviceEventEmitter.addListener('syncCompleted', () => {
      fetchBabies(true);
    });
    return () => sub.remove();
  }, [fetchBabies]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBabies(true);
  }, [search, genderFilter, twinsOnly, sort]);

  const groupedBabies = useMemo(() => {
    if (!babies) return [];
    
    const groups: GroupedBaby[] = [];
    const processedIds = new Set();
    
    babies.forEach((baby: Baby) => {
      if (processedIds.has(baby._id)) return;
      
      if (baby.isTwin) {
        const sibling = babies.find((b: Baby) => 
          b._id !== baby._id && 
          b.isTwin && 
          b.motherName.trim().toLowerCase() === baby.motherName.trim().toLowerCase() &&
          baby.registeredAt && b.registeredAt &&
          Math.abs(new Date(b.registeredAt).getTime() - new Date(baby.registeredAt).getTime()) < 1000 * 60 * 60 * 24
        );
        
        if (sibling) {
          groups.push({
            ...baby,
            isGroup: true,
            _id: `group-${baby._id}-${sibling._id}`,
            displayId: baby.displayId.replace(/-T[12]$/, '').replace(/T[12]-/, '-').replace(/-[AB]$/, ''),
            twins: (baby.twinLabel === 'A' || baby.twinLabel === '1') ? [baby, sibling] : [sibling, baby],
          });
          processedIds.add(baby._id);
          processedIds.add(sibling._id);
          return;
        }
      }
      
      groups.push(baby);
      processedIds.add(baby._id);
    });
    
    return groups;
  }, [babies]);

  const handleDelete = (id: string, isGroup: boolean = false) => {
    Alert.alert(
      isGroup ? 'Delete Twin Group' : 'Delete Baby',
      isGroup ? 'Are you sure you want to delete both twins? All associated samples will be deleted.' : 'Are you sure you want to delete this baby profile? All associated samples will also be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              if (id.startsWith('local-')) {
                const db = getDB();
                await db.runAsync('DELETE FROM sync_queue WHERE temp_id = ?', id);
                fetchBabies();
                return;
              }

              if (isGroup) {
                const group = groupedBabies.find(g => g._id === id);
                if (group && group.twins) {
                  await api.delete(`/babies/${group.twins[0]._id}`);
                  if (group.twins[1]) await api.delete(`/babies/${group.twins[1]._id}`);
                }
              } else {
                await api.delete(`/babies/${id}`);
              }
              fetchBabies();
            } catch (error) {
              console.error('Failed to delete baby', error);
              Alert.alert('Error', 'Failed to delete baby. Please try again.');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: GroupedBaby }) => {
    if (item.isGroup && expandedGroupId === item._id) {
      return (
        <View style={[styles.card, { backgroundColor: '#eef2ff', borderColor: '#e0e7ff' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Users size={20} color="#3730a3" />
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3730a3', marginLeft: 8 }}>Select Twin</Text>
          </View>
          
          {item.twins?.map((twin) => (
            <TouchableOpacity 
              key={twin._id}
              style={{ backgroundColor: '#ffffff', padding: 12, borderRadius: 12, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
              onPress={() => navigation.navigate('BabyDetails', { babyId: twin._id })}
            >
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1e293b' }}>
                    Twin {twin.twinLabel === 'A' ? '1' : twin.twinLabel === 'B' ? '2' : twin.twinLabel}
                  </Text>
                  <View style={[styles.badge, { backgroundColor: '#f1f5f9', marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2 }]}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#475569' }}>{twin.gender}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 12, color: '#64748b' }}>
                  {twin.termStatus || 'Term'} • {twin.weight} g {twin.dob ? `• DOB: ${formatDateDDMMYYYY(twin.dob)}` : ''}
                </Text>
              </View>
              <ArrowRight size={16} color="#818cf8" />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity onPress={() => setExpandedGroupId(null)} style={{ paddingVertical: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: '#64748b' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => {
          if (item.isGroup) {
            setExpandedGroupId(item._id);
          } else {
            navigation.navigate('BabyDetails', { babyId: item._id });
          }
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.motherImage ? (
            <TouchableOpacity onPress={() => setSelectedImage(item.motherImage || null)}>
              <Image source={{ uri: item.motherImage }} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12, backgroundColor: '#e2e8f0' }} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' }}>
              {item.isGroup ? <Users size={24} color="#94a3b8" /> : <Text style={{ fontSize: 20, color: '#64748b', fontWeight: 'bold' }}>{item.motherName.charAt(0).toUpperCase()}</Text>}
            </View>
          )}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Text style={styles.cardTitle}>{item.motherName}</Text>
              {!item.isGroup && item.dob && (
                <Text style={styles.cardDob}>DOB: {formatDateDDMMYYYY(item.dob)}</Text>
              )}
            </View>
            
            <Text style={styles.cardSubtitle}>{item.displayId}</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap', gap: 6 }}>
              {item.isGroup ? (
                <View style={[styles.badge, { backgroundColor: '#f3e8ff', borderWidth: 1, borderColor: '#e9d5ff' }]}>
                  <Text style={[styles.badgeText, { color: '#7e22ce' }]}>Twins</Text>
                </View>
              ) : (
                <>
                  <View style={[styles.badge, { backgroundColor: item.gender === 'Male' ? '#eff6ff' : '#fdf2f8' }]}>
                    <Text style={[styles.badgeText, { color: item.gender === 'Male' ? '#3b82f6' : '#ec4899' }]}>{item.gender}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: item.termStatus === 'Term' ? '#dcfce7' : '#ffedd5' }]}>
                    <Text style={[styles.badgeText, { color: item.termStatus === 'Term' ? '#22c55e' : '#f97316' }]}>{item.termStatus || 'Term'}</Text>
                  </View>
                  <View style={styles.weightBadge}>
                    <Text style={styles.weightText}>{item.weight} g</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' }}>
          <Text style={styles.registeredDate}>
            {formatDateDDMMYYYY(item.registeredAt)}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {!item.isGroup && (
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  navigation.navigate('AddBaby', { babyId: item._id });
                }}
              >
                <Pencil size={18} color="#94a3b8" />
              </TouchableOpacity>
            )}
            {user?.role === 'admin' && (
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id, item.isGroup);
                }}
              >
                <Trash2 size={18} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Babies</Text>
          <Text style={styles.headerSubtitle}>Hello, {user?.name}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <LogOut size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by ID or Mother's Name..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filters and Sort */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterPillsContainer}>
          <TouchableOpacity 
            style={[styles.filterPill, genderFilter === 'Male' && styles.filterPillActive]}
            onPress={() => setGenderFilter(prev => prev === 'Male' ? null : 'Male')}
          >
            <Text style={[styles.filterPillText, genderFilter === 'Male' && styles.filterPillTextActive]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterPill, genderFilter === 'Female' && styles.filterPillActive]}
            onPress={() => setGenderFilter(prev => prev === 'Female' ? null : 'Female')}
          >
            <Text style={[styles.filterPillText, genderFilter === 'Female' && styles.filterPillTextActive]}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterPill, twinsOnly && styles.filterPillActive]}
            onPress={() => setTwinsOnly(!twinsOnly)}
          >
            <Text style={[styles.filterPillText, twinsOnly && styles.filterPillTextActive]}>Twins Only</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setSort(prev => prev === 'latest' ? 'oldest' : 'latest')}
        >
          <Text style={styles.sortText}>{sort === 'latest' ? 'Latest First' : 'Oldest First'}</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading && !refreshing ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      ) : (
        <FlatList
          data={groupedBabies}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Text style={{ color: '#64748b', fontSize: 16 }}>No records found.</Text>
            </View>
          }
        />
      )}

      {/* Full Screen Image Modal */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade" onRequestClose={() => setSelectedImage(null)}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelectedImage(null)} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <Image source={{ uri: selectedImage || '' }} style={{ width: 300, height: 300 }} resizeMode="contain" />
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddBaby')}
      >
        <Plus size={28} color="#ffffff" />
      </TouchableOpacity>
      <GlobalSyncBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 24, paddingVertical: 16, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1e293b' },
  headerSubtitle: { fontSize: 14, color: '#64748b' },
  logoutButton: { padding: 8, backgroundColor: '#fef2f2', borderRadius: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16, color: '#1e293b' },
  
  filtersContainer: { paddingHorizontal: 24, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 },
  filterPillsContainer: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', flex: 1 },
  filterPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#ffffff' },
  filterPillActive: { borderColor: '#4f46e5', backgroundColor: '#e0e7ff' },
  filterPillText: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  filterPillTextActive: { color: '#4f46e5', fontWeight: '600' },
  sortButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#f1f5f9' },
  sortText: { fontSize: 13, color: '#334155', fontWeight: '500' },

  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#ffffff', padding: 16, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  cardSubtitle: { color: '#64748b', fontSize: 14, marginTop: 2 },
  cardDob: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  weightBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#ccfbf1' },
  weightText: { fontSize: 12, fontWeight: '600', color: '#0f766e' },
  registeredDate: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },

  fab: { position: 'absolute', bottom: 32, right: 24, backgroundColor: '#4f46e5', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 6 }
});
