import type { GetRef } from 'antd';
import { InputNumber } from 'antd';
import React, {
  useRef,
  useState
} from 'react';
import { TAuditMedicine } from '../../../../types/audit';

interface EditableCellProps {
  dataIndex: keyof TAuditMedicine;
  record: TAuditMedicine;
  onSave: (value: TAuditMedicine) => void;
}

type InputRef = GetRef<typeof InputNumber>;

const EditableCell: React.FC<EditableCellProps> = ({
    dataIndex,
    record,
    onSave,
    ...restProps
  }) => {
  const [ editing, setEditing ] = useState<Boolean>(false);
  const inputRef = useRef<InputRef>(null);
  
  const toggleEdit = () => {
    setEditing(!editing);
  };
  
  const handleBlur = () => {
    toggleEdit();
    onSave({...record, [dataIndex]: Number(inputRef.current?.value)});
  };
  
  return (
    <td {...restProps}>
      {
        editing ? (
          <InputNumber
            ref={inputRef}
            min={0}
            defaultValue={Number(record[dataIndex])}
            onBlur={handleBlur}
          />
        ) : (
          <div style={{ paddingRight: 24 }} onClick={toggleEdit}>
            {Number(record[dataIndex])}
          </div>
        )
      }
    </td>
  );
};

export default EditableCell;
