import type { GetRef } from 'antd';
import { InputNumber } from 'antd';
import React, {
  useRef,
  useState
} from 'react';
import { Tooltip } from "../../../Tooltip";

interface EditableCellProps {
  dataIndex: string;
  tooltip?: string;
  record: any;
  onSave: (value: any) => void;
}

type InputRef = GetRef<typeof InputNumber>;

export const EditableNumberCell: React.FC<EditableCellProps> = ({
    dataIndex,
    record,
    onSave,
    tooltip = 'Click to edit cell',
    ...restProps
  }) => {
  const [ editing, setEditing ] = useState<Boolean>(false);
  const inputRef = useRef<InputRef>(null);
  const value = Number(record[dataIndex]);
  
  const toggleEdit = () => {
    setEditing(!editing);
    if ( !editing ) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };
  
  const handleBlur = () => {
    const currentValue = Number(inputRef.current?.value);
    toggleEdit();
    
    if ( currentValue !== record [dataIndex]) onSave({...record, [dataIndex]: currentValue});
  };
  
  return (
    <div {...restProps}>
      {
        editing ? (
          <InputNumber
            ref={inputRef}
            min={0}
            defaultValue={value}
            onBlur={handleBlur}
          />
        ) : (
          <Tooltip title={tooltip}>
            <div style={{ paddingRight: 24 }} onClick={toggleEdit}>
              {value}
            </div>
          </Tooltip>
        )
      }
    </div>
  );
};
