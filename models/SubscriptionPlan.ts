export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  features: SubscriptionFeatures;
};

export type SubscriptionFeatures = {
  matchesPerWeek: number;
  chatLimit: number;
  manualSearch: boolean;
  sendInterestOption: boolean;
};