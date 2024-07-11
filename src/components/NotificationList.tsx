// import React, { useEffect, useState } from "react";
// import {
//   getNotificationsForUser,
//   markNotificationAsRead,
//   updateTradeOfferStatus,
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
//     try {
//       await markNotificationAsRead(notificationId);
//       setNotifications(
//         notifications.filter((n) => n.id_notification !== notificationId)
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const handleAcceptTrade = async (tradeOfferId: number) => {
//     try {
//       await updateTradeOfferStatus(tradeOfferId, "accepted");
//       const notification = notifications.find(
//         (n) => n.trade_offer_id === tradeOfferId
//       );
//       if (notification) {
//         await sendNotification({
//           userId: notification.user_id, // The user who sent the trade offer
//           message: `Votre demande de troc avec l'ID ${tradeOfferId} a été acceptée.`,
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
//     try {
//       await updateTradeOfferStatus(tradeOfferId, "rejected");
//       const notification = notifications.find(
//         (n) => n.trade_offer_id === tradeOfferId
//       );
//       if (notification) {
//         await sendNotification({
//           userId: notification.user_id, // The user who sent the trade offer
//           message: `Votre demande de troc avec l'ID ${tradeOfferId} a été refusée.`,
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
//           key={notification.id_notification}
//           className="notification border p-4 mb-4 rounded-md shadow"
//         >
//           <p>{notification.message}</p>
//           <div className="flex space-x-2 mt-2">
//             <button
//               onClick={() => handleMarkAsRead(notification.id_notification)}
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
  updateTradeOfferStatus,
  createNotification,
} from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { Notification } from "@/types/types";

const NotificationList: React.FC = () => {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (userId) {
      getNotificationsForUser(userId)
        .then((data) => {
          console.log("Notifications fetched:", data);
          setNotifications(data);
        })
        .catch((error) =>
          console.error("Error fetching notifications:", error)
        );
    }
  }, [userId]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      console.log("Marking notification as read:", notificationId);
      await markNotificationAsRead(notificationId);
      setNotifications(
        notifications.filter((n) => n.id_notification !== notificationId)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleAcceptTrade = async (tradeOfferId: number) => {
    try {
      console.log("Accepting trade offer:", tradeOfferId);
      await updateTradeOfferStatus(tradeOfferId, "accepted");
      const notification = notifications.find(
        (n) => n.trade_offer_id === tradeOfferId
      );
      if (notification) {
        await createNotification({
          userId: notification.user_id, // The user who sent the trade offer
          message: `Votre demande de troc avec l'ID ${tradeOfferId} a été acceptée.`,
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
    try {
      console.log("Rejecting trade offer:", tradeOfferId);
      await updateTradeStatus(tradeOfferId, "rejected");
      const notification = notifications.find(
        (n) => n.trade_offer_id === tradeOfferId
      );
      if (notification) {
        await createNotification({
          userId: notification.user_id, // The user who sent the trade offer
          message: `Votre demande de troc avec l'ID ${tradeOfferId} a été refusée.`,
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
          key={notification.id_notification}
          className="notification border p-4 mb-4 rounded-md shadow"
        >
          <p>{notification.message}</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleMarkAsRead(notification.id_notification)}
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
