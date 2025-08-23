import { ChatIcon } from "@/components/icons/tabs/ChatIcon";
import { HomeIcon } from "@/components/icons/tabs/HomeIcon";
import { MatchesIcon } from "@/components/icons/tabs/MatchesIcon";
import { SearchIcon } from "@/components/icons/tabs/SearchIcon";
import { SettingsIcon } from "@/components/icons/tabs/SettingsIcon";
import { TabBar } from "@/components/navigation/TabBar";
import { ROUTES } from "@/resources/routes";
import { Stack, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function TabLayout() {
  // const { ability } = usePermissions();
  // const { track } = useAnalytics();
  const colorScheme = useColorScheme();
  // const setMedication = useMedicationTrackingStore(
  //   (state) => state.setMedication,
  // );
  // const setJourneyId = useMedicationTrackingStore(
  //   (state) => state.setJourneyId,
  // );

  // const setSelectedDate = useMedicationTrackingStore(
  //   (state) => state.setSelectedDate,
  // );
  // const selectedDate = useInsightsStore((state) => state.selectedDate);
  // const appetiteDailyRecord = useAppetiteStore(
  //   (state) => state.appetiteDailyRecords,
  // );

  // const userMeasurements = useUserStore((s) => s.userMeasurements);
  // const moodDailyRecord = useMoodStore((s) => s.moodDailyRecords);

  // const urgentSymptoms = useInsightsStore(
  //   (state) => state.urgentSymptoms,
  // );
  // const warningSymptoms = useInsightsStore(
  //   (state) => state.warningSymptoms,
  // );

  // const isAppetiteTrackingStarted =
  //   Object.keys(appetiteDailyRecord).length !== 0;

  // const isMoodTrackingStarted = Object.keys(moodDailyRecord).length !== 0;
  // const journeys = useUserStore((state) => state.journeys);

  // const { latestMedicationJourney, latestMedication } =
  //   useLatestMedicationJourney();

  // const { shouldShowAlerts } = useFetchMedicationSymptomAlerts();

  // function iconBy(trackingType: TrackingType) {
  //   switch (trackingType) {
  //     case "symptoms":
  //       return <SymptomTrackIcon height={38} />;
  //     case "appetite":
  //       return <AppetiteTrackIcon height={38} />;
  //     case "mood":
  //       return <MoodTrackIcon height={38} />;
  //     case "weight":
  //       return <WeightTrackIcon height={38} />;
  //     case "medication":
  //       return <MedTrackIcon height={38} />;
  //   }
  // }

  // const hoverMenuOptions: HoverMenuOption[] = trackingTypes
  //   .filter((item) => {
  //     if (item === "symptoms") {
  //       return ability.can("track", "SymptomTracking");
  //     }
  //     if (item === "appetite") {
  //       return ability.can("track", "AppetiteTracking");
  //     }
  //     if (item === "mood") {
  //       return ability.can("track", "MoodTracking");
  //     }
  //     if (item === "weight") {
  //       return ability.can("track", "WeightTracking");
  //     }
  //     if (item === "medication") {
  //       return (
  //         isCurrentlyOnTakingMedicationJourney(
  //           journeys || [],
  //           latestMedication,
  //         ) && ability.can("track", "MedicationTracking")
  //       );
  //     }
  //     return true;
  //   })
  //   .map((item) => {
  //     return {
  //       trackingType: item,
  //       icon: iconBy(item),
  //     };
  //   });

  // const onPressMenuItem = (trackingType: TrackingType) => {
  //   switch (trackingType) {
  //     case "symptoms":
  //       router.push("/symptoms-tracking-form");
  //       break;
  //     case "appetite":
  //       if (isAppetiteTrackingStarted) {
  //         router.push("/appetite-tracking-form");
  //       } else {
  //         router.push("/(app)/(appetite-tracking)/welcome-screen");
  //       }
  //       break;
  //     case "mood":
  //       if (isMoodTrackingStarted) {
  //         router.push("/mood-tracking-form");
  //       } else {
  //         router.push("/(app)/(mood-tracking)/mood-welcome-screen");
  //       }
  //       break;
  //     case "weight":
  //       if (
  //         (userMeasurements?.weight || []).length > 0
  //       ) {
  //         router.push("/(app)/(weight-tracking)/current-weight-tracking");
  //       } else {
  //         router.push("/(app)/(weight-tracking)/weight-tracking-welcome-screen");
  //       }
  //       break;
  //     case "medication":
  //       if (
  //         !latestMedicationJourney ||
  //         !latestMedication ||
  //         !isSupportedMedication(latestMedication)
  //       ) {
  //         console.error(
  //           "Medication Journey or Latest Medication record not found or Currently not taking medication",
  //         );
  //         return;
  //       }
  //       setMedication(latestMedication);
  //       setJourneyId(latestMedicationJourney.id);
  //       setSelectedDate(selectedDate);
  //       router.push("/(app)/(medication-tracking)/add-medication-tracking");
  //       break;
  //   }
  // };

  return (
    <>
      <Tabs
        tabBar={(props) => (
          <TabBar
            {...props}
          />
        )}
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name={ROUTES.home}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.matches.page}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <MatchesIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.chat.page}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <ChatIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.search}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <SearchIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.settings.page}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <SettingsIcon focused={focused} />,
          }}
        />
      </Tabs>
    </>
  );
}
