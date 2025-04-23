import { Redirect } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

export default function Index() {
  return <Redirect href="/splash" />;
}
