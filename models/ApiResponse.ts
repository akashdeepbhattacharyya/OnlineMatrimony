import { SubscriptionFeatures } from "./SubscriptionPlan";

export type ApiSuccess<T> = {
  statusCode: number;
  status: true;
  data: T;
};

export type ApiError = {
  errorCode: string;
  message: string;
  statusCode: number;
  status: false;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type PagedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type SubscriptionPlanResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  durationWeeks: number;
  features: string;
};

export type FeatureResponse = {
  chat_limit: number;
  manual_search: boolean;
  matches_per_week: number;
  send_interest_option: boolean;
};

export function mapFeatureResponseToFeature(feature: FeatureResponse): SubscriptionFeatures {
  return {
    chatLimit: feature.chat_limit,
    manualSearch: feature.manual_search,
    matchesPerWeek: feature.matches_per_week,
    sendInterestOption: feature.send_interest_option,
  };
}
