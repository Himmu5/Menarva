export default function authHeader() {
  const token: string | null = localStorage.getItem("token") ;
  console.log("Token : ", token);

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
