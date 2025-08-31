export type Subscription = {
  id: number;
  userId: number;
  planId: number;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  amountPaid: number;
};
