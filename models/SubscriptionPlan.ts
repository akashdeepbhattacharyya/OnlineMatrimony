export type SubscriptionPlan = {
  id: number;
  name: string;
  description: string;
  price: number;
  durationWeeks: number;
  features: SubscriptionFeatures;
};

export type SubscriptionFeatures = {
  matchesPerWeek: number;
  chatLimit: number;
  manualSearch: boolean;
  sendInterestOption: boolean;
};