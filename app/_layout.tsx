import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: "#ff8c00"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    contentStyle: {
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor: '#fff',
    },
  }}
  >
    <Stack.Screen name="index" options={{title: "Home"}} />
    <Stack.Screen name="notes" options={{headerTitle: "Note"}} />
  </Stack>
}

export default RootLayout
