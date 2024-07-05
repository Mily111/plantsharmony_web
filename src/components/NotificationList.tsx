// import React, { useEffect, useState } from "react";
// import {
//   getNotificationsForUser,
//   markNotificationAsRead,
//   updateTradeStatus,
//   sendNotification,
// } from "@/utils/api";
// import { useAuth } from "@/context/AuthContext";
// import { Notification } from "@/types/types";

// const NotificationList: React.FC = () => {
//   const { userId } = useAuth();
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     if (userId) {
//       getNotificationsForUser(userId)
//         .then(setNotifications)
//         .catch(console.error);
//     }
//   }, [userId]);

//   const handleMarkAsRead = async (notificationId: number) => {
//     console.log(`Marking notification ${notificationId} as read`); // Debug log
//     try {
//       await markNotificationAsRead(notificationId);
//       if (userId) {
//         await sendNotification({
//           userId,
//           message: `Notification ${notificationId} reçue et lue.`,
//           tradeOfferId: null,
//         });
//       }
//       setNotifications(notifications.filter((n) => n.id !== notificationId));
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const handleAcceptTrade = async (tradeOfferId: number) => {
//     console.log(`Accepting trade offer ${tradeOfferId}`); // Debug log
//     try {
//       await updateTradeStatus(tradeOfferId, "accepted");
//       if (userId) {
//         await sendNotification({
//           userId,
//           message: `L'utilisateur ${userId} a accepté la demande de troc.`,
//           tradeOfferId,
//         });
//       }
//       setNotifications(
//         notifications.filter((n) => n.trade_offer_id !== tradeOfferId)
//       );
//     } catch (error) {
//       console.error("Error accepting trade:", error);
//     }
//   };

//   const handleRejectTrade = async (tradeOfferId: number) => {
//     console.log(`Rejecting trade offer ${tradeOfferId}`); // Debug log
//     try {
//       await updateTradeStatus(tradeOfferId, "rejected");
//       if (userId) {
//         await sendNotification({
//           userId,
//           message: `L'utilisateur ${userId} a refusé la demande de troc.`,
//           tradeOfferId,
//         });
//       }
//       setNotifications(
//         notifications.filter((n) => n.trade_offer_id !== tradeOfferId)
//       );
//     } catch (error) {
//       console.error("Error rejecting trade:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Mes Notifications</h2>
//       {notifications.map((notification) => (
//         <div
//           key={notification.id}
//           className="notification border p-4 mb-4 rounded-md shadow"
//         >
//           <p>{notification.message}</p>
//           <div className="flex space-x-2 mt-2">
//             <button
//               onClick={() => handleMarkAsRead(notification.id)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
//             >
//               Marquer comme lu
//             </button>
//             {notification.trade_offer_id !== null && (
//               <>
//                 <button
//                   onClick={() =>
//                     handleAcceptTrade(notification.trade_offer_id!)
//                   }
//                   className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
//                 >
//                   Accepter
//                 </button>
//                 <button
//                   onClick={() =>
//                     handleRejectTrade(notification.trade_offer_id!)
//                   }
//                   className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//                 >
//                   Refuser
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotificationList;

import React, { useEffect, useState } from "react";
import {
  getNotificationsForUser,
  markNotificationAsRead,
  updateTradeStatus,
  sendNotification,
} from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { Notification } from "@/types/types";

const NotificationList: React.FC = () => {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (userId) {
      getNotificationsForUser(userId)
        .then(setNotifications)
        .catch(console.error);
    }
  }, [userId]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId);
      if (userId) {
        await sendNotification({
          userId,
          message: `Notification ${notificationId} reçue et lue.`,
          tradeOfferId: null,
        });
      }
      setNotifications(notifications.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleAcceptTrade = async (tradeOfferId: number) => {
    console.log(`Accepting trade offer ${tradeOfferId}`); // Debug log
    try {
      await updateTradeStatus(tradeOfferId, "accepted");
      if (userId) {
        await sendNotification({
          userId,
          message: `L'utilisateur ${userId} a accepté la demande de troc.`,
          tradeOfferId,
        });
      }
      setNotifications(
        notifications.filter((n) => n.trade_offer_id !== tradeOfferId)
      );
    } catch (error) {
      console.error("Error accepting trade:", error);
    }
  };

  const handleRejectTrade = async (tradeOfferId: number) => {
    console.log(`Rejecting trade offer ${tradeOfferId}`); // Debug log
    try {
      await updateTradeStatus(tradeOfferId, "rejected");
      if (userId) {
        await sendNotification({
          userId,
          message: `L'utilisateur ${userId} a refusé la demande de troc.`,
          tradeOfferId,
        });
      }
      setNotifications(
        notifications.filter((n) => n.trade_offer_id !== tradeOfferId)
      );
    } catch (error) {
      console.error("Error rejecting trade:", error);
    }
  };

  return (
    <div>
      <h2>Mes Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="notification border p-4 mb-4 rounded-md shadow"
        >
          <p>{notification.message}</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleMarkAsRead(notification.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            >
              Marquer comme lu
            </button>
            {notification.trade_offer_id !== null && (
              <>
                <button
                  onClick={() =>
                    handleAcceptTrade(notification.trade_offer_id!)
                  }
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Accepter
                </button>
                <button
                  onClick={() =>
                    handleRejectTrade(notification.trade_offer_id!)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Refuser
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
