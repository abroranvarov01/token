import Cookies from "js-cookie";
export function loadState(key) {
  try {
    const serializedState = Cookies.get(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    Cookies.set(key, serializedState);
  } catch (e) {}
}
