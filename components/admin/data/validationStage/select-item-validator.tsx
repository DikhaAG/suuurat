import { getAllValidator } from "@/app/lib/actions/userValidatorActions";
import { UserValidatorModel } from "@/app/lib/models";

import { SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function SelectItemValidator() {
  const [datas, setDatas] = useState<UserValidatorModel[]>([]);
  useEffect(() => {
    getAllValidator().then((res) => setDatas(res));
  }, []);
  return (
    <>
      {datas.length !== 0 ? (
        <>
          <SelectContent>
            {datas.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </>
      ) : (
        <SelectContent>Belum ada data</SelectContent>
      )}
    </>
  );
}
