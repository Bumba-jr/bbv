'use client';

import { useState } from 'react';
import { Gift, Star, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

interface LoyaltyMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  ordersCount: number;
  rewards: Reward[];
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  discount: number;
  expiryDate: string;
  claimed: boolean;
}

const initialMembers: LoyaltyMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-06-15',
    points: 2500,
    tier: 'gold',
    totalSpent: 2500,
    ordersCount: 25,
    rewards: [
      {
        id: '1',
        name: '20% Discount',
        description: 'Get 20% off on your next order',
        pointsRequired: 500,
        discount: 20,
        expiryDate: '2024-03-31',
        claimed: false,
      },
      {
        id: '2',
        name: 'Free Delivery',
        description: 'Free delivery on next 3 orders',
        pointsRequired: 300,
        discount: 0,
        expiryDate: '2024-02-28',
        claimed: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1 (555) 234-5678',
    joinDate: '2023-09-20',
    points: 1200,
    tier: 'silver',
    totalSpent: 1200,
    ordersCount: 12,
    rewards: [
      {
        id: '3',
        name: '10% Discount',
        description: 'Get 10% off on your next order',
        pointsRequired: 250,
        discount: 10,
        expiryDate: '2024-03-15',
        claimed: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2024-01-05',
    points: 350,
    tier: 'bronze',
    totalSpent: 350,
    ordersCount: 3,
    rewards: [],
  },
];

const rewards: Reward[] = [
  {
    id: '1',
    name: '10% Discount',
    description: 'Get 10% off on your next order',
    pointsRequired: 250,
    discount: 10,
    expiryDate: '2024-03-31',
    claimed: false,
  },
  {
    id: '2',
    name: '20% Discount',
    description: 'Get 20% off on your next order',
    pointsRequired: 500,
    discount: 20,
    expiryDate: '2024-03-31',
    claimed: false,
  },
  {
    id: '3',
    name: 'Free Delivery',
    description: 'Free delivery on next 3 orders',
    pointsRequired: 300,
    discount: 0,
    expiryDate: '2024-02-28',
    claimed: false,
  },
  {
    id: '4',
    name: 'Birthday Gift',
    description: 'Special birthday discount 30% off',
    pointsRequired: 750,
    discount: 30,
    expiryDate: '2024-04-30',
    claimed: false,
  },
  {
    id: '5',
    name: 'Free Premium Service',
    description: 'One free premium laundry service',
    pointsRequired: 600,
    discount: 0,
    expiryDate: '2024-03-15',
    claimed: false,
  },
];

export default function LoyaltyProgram() {
  const [members, setMembers] = useState<LoyaltyMember[]>(initialMembers);
  const [selectedMember, setSelectedMember] = useState<LoyaltyMember | null>(null);
  const [filterTier, setFilterTier] = useState<string>('all');

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      bronze: 'bg-amber-100 text-amber-800',
      silver: 'bg-gray-100 text-gray-800',
      gold: 'bg-yellow-100 text-yellow-800',
      platinum: 'bg-purple-100 text-purple-800',
    };
    return colors[tier] || colors.bronze;
  };

  const getTierBadgeColor = (tier: string) => {
    const colors: Record<string, string> = {
      bronze: 'border-amber-300 bg-amber-50',
      silver: 'border-gray-300 bg-gray-50',
      gold: 'border-yellow-300 bg-yellow-50',
      platinum: 'border-purple-300 bg-purple-50',
    };
    return colors[tier] || colors.bronze;
  };

  const calculateTier = (totalSpent: number): LoyaltyMember['tier'] => {
    if (totalSpent >= 5000) return 'platinum';
    if (totalSpent >= 2000) return 'gold';
    if (totalSpent >= 1000) return 'silver';
    return 'bronze';
  };

  const addPointsToMember = (memberId: string, points: number) => {
    setMembers(
      members.map((member) => {
        if (member.id === memberId) {
          const newPoints = member.points + points;
          const newTotalSpent = member.totalSpent + points;
          return {
            ...member,
            points: newPoints,
            totalSpent: newTotalSpent,
            tier: calculateTier(newTotalSpent),
          };
        }
        return member;
      })
    );
    setSelectedMember(null);
    toast.success(`${points} points added successfully!`);
  };

  const claimReward = (memberId: string, rewardId: string) => {
    setMembers(
      members.map((member) => {
        if (member.id === memberId) {
          const reward = rewards.find((r) => r.id === rewardId);
          if (reward && member.points >= reward.pointsRequired) {
            return {
              ...member,
              points: member.points - reward.pointsRequired,
              rewards: [
                ...member.rewards,
                {
                  ...reward,
                  claimed: true,
                },
              ],
            };
          }
        }
        return member;
      })
    );
    toast.success('Reward claimed successfully!');
  };

  const filteredMembers =
    filterTier === 'all' ? members : members.filter((m) => m.tier === filterTier);

  const stats = {
    totalMembers: members.length,
    totalPointsIssued: members.reduce((sum, m) => sum + m.points, 0),
    totalSpentByMembers: members.reduce((sum, m) => sum + m.totalSpent, 0),
    averageOrdersPerMember: Math.round(
      members.reduce((sum, m) => sum + m.ordersCount, 0) / members.length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalMembers}</p>
            </div>
            <Users className="w-12 h-12 text-blue-100 p-2 bg-blue-50 rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Points Issued</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPointsIssued}</p>
            </div>
            <Star className="w-12 h-12 text-yellow-100 p-2 bg-yellow-50 rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${stats.totalSpentByMembers}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-100 p-2 bg-green-50 rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.averageOrdersPerMember}
              </p>
            </div>
            <Gift className="w-12 h-12 text-pink-100 p-2 bg-pink-50 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Loyalty Program Members</h2>
        <p className="text-gray-600 mt-1">Manage and reward your loyal customers</p>
      </div>

      {/* Tier Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'bronze', 'silver', 'gold', 'platinum'].map((tier) => (
          <button
            key={tier}
            onClick={() => setFilterTier(tier)}
            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
              filterTier === tier
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`border-2 ${getTierBadgeColor(member.tier)} rounded-lg p-4 cursor-pointer hover:shadow-lg transition`}
            onClick={() => setSelectedMember(member)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getTierColor(member.tier)}`}>
                {member.tier}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Points</p>
                <p className="font-bold text-gray-900 text-lg">{member.points}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Spent</p>
                <p className="font-bold text-gray-900">${member.totalSpent}</p>
              </div>
              <div>
                <p className="text-gray-600">Orders</p>
                <p className="font-bold text-gray-900">{member.ordersCount}</p>
              </div>
              <div>
                <p className="text-gray-600">Joined</p>
                <p className="font-bold text-gray-900">{member.joinDate}</p>
              </div>
            </div>

            {member.rewards.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-300">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Claimed Rewards: {member.rewards.filter((r) => r.claimed).length}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{selectedMember.name}</h3>

            {/* Member Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{selectedMember.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{selectedMember.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-semibold text-gray-900">{selectedMember.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tier</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${getTierColor(selectedMember.tier)}`}>
                  {selectedMember.tier}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Points</p>
                <p className="font-bold text-blue-600 text-xl">{selectedMember.points}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="font-bold text-gray-900 text-lg">{selectedMember.ordersCount}</p>
              </div>
            </div>

            {/* Available Rewards */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Available Rewards</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {rewards.map((reward) => (
                  <div key={reward.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{reward.name}</p>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Expires: {reward.expiryDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{reward.pointsRequired} pts</p>
                      <button
                        onClick={() => {
                          if (selectedMember.points >= reward.pointsRequired) {
                            claimReward(selectedMember.id, reward.id);
                          } else {
                            toast.error('Not enough points');
                          }
                        }}
                        disabled={selectedMember.points < reward.pointsRequired}
                        className={`mt-2 px-3 py-1 rounded text-xs font-medium transition ${
                          selectedMember.points >= reward.pointsRequired
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Points */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">Add Loyalty Points</h4>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 200, 500].map((points) => (
                  <button
                    key={points}
                    onClick={() => addPointsToMember(selectedMember.id, points)}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition font-medium"
                  >
                    +{points}
                  </button>
                ))}
              </div>
            </div>

            {/* Claimed Rewards */}
            {selectedMember.rewards.filter((r) => r.claimed).length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Claimed Rewards</h4>
                <div className="space-y-2">
                  {selectedMember.rewards
                    .filter((r) => r.claimed)
                    .map((reward) => (
                      <div key={reward.id} className="bg-green-50 p-3 rounded-lg">
                        <p className="font-semibold text-green-900">{reward.name}</p>
                        <p className="text-sm text-green-700">{reward.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedMember(null)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
