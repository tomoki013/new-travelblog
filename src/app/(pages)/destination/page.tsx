import { regionData } from "@/data/region";
import Client from "./Client";

export default function Page() {
  // 以前はここにあったグルーピング処理が不要になる
  return <Client regionData={regionData} />;
}
