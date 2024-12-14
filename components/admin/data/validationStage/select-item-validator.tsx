import { getAllValidatorWithException } from "@/app/lib/actions/userValidatorActions";
import { UserValidatorModel } from "@/app/lib/models";

import { SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function SelectItemValidator({
  validationStageId,
}: {
  validationStageId: string;
}) {
  const [datas, setDatas] = useState<UserValidatorModel[]>([]);
  useEffect(() => {
    getAllValidatorWithException(validationStageId).then((res) =>
      setDatas(res),
    );
  }, [validationStageId]);
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
