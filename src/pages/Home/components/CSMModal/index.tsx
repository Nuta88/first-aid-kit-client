import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input,
  Select
} from '../../../../components';
import { layout } from '../../../../constants/form';
import { MedicinePriorityEnum } from '../../../../constants/medicine';
import { useFetchCategoryQuery } from '../../../../services/category';
import {
  useCreateConstantlyStoredMedicineMutation,
  useUpdateConstantlyStoredMedicineMutation
} from '../../../../services/constantlyStoredMedicine';
import { IConstantlyStoredMedicine } from '../../../../types/medicine';
import {
  generateOptions,
  generateOptionsFromStringList
} from '../../../../utils/form';
import { useFetchMedicines } from '../../hooks/useFetchMedicines';

import {
  generateErrorFormFields,
  generateMedicine,
  IFormValues
} from './helpers';
import { useForm } from "./hooks/useForm";

interface IMedicineModalProps {
  isOpen: boolean;
  medicine: IConstantlyStoredMedicine | null;
  onCancel: () => void
}

const CSMModal: FC<IMedicineModalProps> = ({ isOpen, medicine, onCancel }) => {
  const [ form ] = Form.useForm();
  const { rules, initialValues, isDisabledFormItem } = useForm(medicine);
  const { data: categories = [] } = useFetchCategoryQuery({});
  const { csMedicines } = useFetchMedicines();
  const [ createConstantlyStoredMedicine ] = useCreateConstantlyStoredMedicineMutation({});
  const [ updateConstantlyStoredMedicine ] = useUpdateConstantlyStoredMedicineMutation({});
  const isCreateMedicine = !medicine || !medicine.id || !medicine.priority;
  const title = isCreateMedicine ? 'Add medication to permanent storage' : 'Edit constantly stored medicine';
  
  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };
  
  const onFinish = (values: IFormValues): void => {
    if (isCreateMedicine) {
      createConstantlyStoredMedicine(generateMedicine(values, categories));
    } else {
      updateConstantlyStoredMedicine({id: medicine.id, ...generateMedicine(values, categories)})
    }
    onCloseModal();
  };
  
  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      okText="Save"
      onOk={async () => {
        try {
          const values = await form?.validateFields();
          const errors = generateErrorFormFields(values, csMedicines);
  
          if ( errors.length ) {
            form.setFields(errors);
            return;
          }
          
          onFinish(values);
        } catch (error) {
          console.log('Failed:', error);
        }
      }}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="medicine-modal"
        autoComplete="off"
      >
        <Form.Item
          name="priority"
          label="Priority"
          rules={[
            { required: true, message: 'Please select priority!' }
          ]}
        >
          <Select
            placeholder="Select priority"
            options={generateOptionsFromStringList(Object.values(MedicinePriorityEnum))}
          />
        </Form.Item>
        <Form.Item
          name="categoryNames"
          label="Category"
          rules={rules.category}
        >
          <Select
            mode="multiple"
            placeholder="Select category"
            disabled={isDisabledFormItem}
            allowClear
            options={generateOptions(categories, 'name')}
          />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate
        >
          {({ getFieldValue }) =>
            getFieldValue('priority') === MedicinePriorityEnum.NAME ? (
              <>
                <Form.Item
                  label="Name"
                  name="name"
                  data-testid="name"
                  rules={rules.name}
                >
                  <Input disabled={isDisabledFormItem} />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  data-testid="description"
                >
                  <Input type="textarea" rows={4} disabled={isDisabledFormItem} />
                </Form.Item>
              </>
            ) : null
          }
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(CSMModal);
