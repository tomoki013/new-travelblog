import { regionsData } from "@/data/regions";
import AllDestination from "@/components/featured/destination/allDestination";

export default function Page() {
  // 以前はここにあったグルーピング処理が不要になる
  return <AllDestination regionsData={regionsData} />;
}
