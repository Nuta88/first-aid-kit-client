import { useState } from 'react';
import { TAuditMedicine } from "../../../types/audit";

export const useRowSelection = () => {
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);
  
  const onSelectAudits = (keys: React.Key[]) => {
    setSelectedRowKeys(keys);
  };
  
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelectAudits(selectedRowKeys);
    },
    getCheckboxProps: (record: TAuditMedicine) => ({
      disabled: record.isCorrect,
      name: record.name,
    }),
  };
  
  return {
    selectedRowKeys,
    rowSelection,
    onSelectAudits
  };
}
