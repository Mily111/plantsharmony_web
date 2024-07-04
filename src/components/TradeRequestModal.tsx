import React from "react";
import { TradeRequestModalProps } from "@/types/types";

const TradeRequestModal: React.FC<TradeRequestModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  userPlants,
  userId,
}) => {
  const [selectedPlantId, setSelectedPlantId] = React.useState<number | null>(
    null
  );

  const handleSubmit = () => {
    if (selectedPlantId !== null) {
      onSubmit(selectedPlantId);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Sélectionner une plante</h2>
        <select
          onChange={(e) => setSelectedPlantId(parseInt(e.target.value))}
          className="mb-4 p-2 border rounded"
        >
          <option value="">Sélectionner une de vos plantes</option>
          {userPlants.map((plant) => (
            <option
              key={plant.id_plante_suggested}
              value={plant.id_plante_suggested}
            >
              {plant.name_plant}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button onClick={onCancel} className="btn btn-secondary mr-2">
            Annuler
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeRequestModal;

// import React from 'react';
// import { Modal, Button, Select, Form } from 'antd';
// import { SuggestedPlant } from '@/types/types';

// interface TradeRequestModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   onSubmit: (offeredPlantId: number) => Promise<void>;
//   userPlants: SuggestedPlant[];
// }

// const TradeRequestModal: React.FC<TradeRequestModalProps> = ({
//   visible,
//   onCancel,
//   onSubmit,
//   userPlants,
// }) => {
//   const [form] = Form.useForm();

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         onSubmit(values.offeredPlantId);
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//       });
//   };

//   return (
//     <Modal
//       title="Sélectionnez votre plante"
//       visible={visible}
//       onOk={handleOk}
//       onCancel={onCancel}
//     >
//       <Form form={form} layout="vertical" name="trade_request_form">
//         <Form.Item
//           name="offeredPlantId"
//           label="Votre plante :"
//           rules={[{ required: true, message: 'Veuillez sélectionner une plante' }]}
//         >
//           <Select placeholder="Sélectionnez une plante">
//             {userPlants.map((plant) => (
//               <Select.Option key={plant.id_plante_suggested} value={plant.id_plante_suggested}>
//                 {plant.name_plant}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default TradeRequestModal;
