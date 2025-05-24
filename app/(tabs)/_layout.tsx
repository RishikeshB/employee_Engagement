import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name='landing_page' options={{ title: 'Home' }} />
      <Tabs.Screen name='employee_engagement_form' options={{ title: 'Form' }} />
    </Tabs>
  );
}
