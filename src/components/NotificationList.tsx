// // components/NotificationList.tsx

// import React, { useEffect, useState } from "react";
// import { getNotificationsForUser, markNotificationAsRead } from "@/utils/api";
// import { useAuth } from "@/context/AuthContext";
// import { Notification } from "@/types/types";

// const NotificationList = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const { userId } = useAuth();

//   useEffect(() => {
//     if (userId) {
//       getNotificationsForUser(userId)
//         .then((data) => setNotifications(data))
//         .catch((error) =>
//           console.error(
//             "Erreur lors de la récupération des notifications:",
//             error
//           )
//         );
//     }
//   }, [userId]);

//   const handleMarkAsRead = async (notificationId: number) => {
//     try {
//       await markNotificationAsRead(notificationId);
//       setNotifications(
//         notifications.map((notification) =>
//           notification.id === notificationId
//             ? { ...notification, read_status: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Erreur lors du marquage de la notification comme lue:",
//         error
//       );
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-bold mb-4 text-teal-500">
//         Mes Notifications
//       </h3>
//       <ul>
//         {notifications.map((notification) => (
//           <li
//             key={notification.id}
//             className={`bg-white shadow-md rounded-lg p-4 mb-4 ${
//               notification.read_status ? "bg-gray-200" : "bg-white"
//             }`}
//           >
//             <p>{notification.message}</p>
//             {!notification.read_status && (
//               <button
//                 onClick={() => handleMarkAsRead(notification.id)}
//                 className="btn btn-primary mt-2"
//               >
//                 Marquer comme lu
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationList;

import React, { useEffect, useState } from "react";
import { getNotificationsForUser, markNotificationAsRead } from "@/utils/api";
import { Notification } from "@/types/types";
import { useAuth } from "@/context/AuthContext";

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      getNotificationsForUser(userId)
        .then((data) => setNotifications(data))
        .catch((error) => console.error(error.message));
    }
  }, [userId]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mes Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="p-4 mb-4 bg-white shadow-md rounded-lg"
        >
          <p>{notification.message}</p>
          <button
            onClick={() => handleMarkAsRead(notification.id)}
            className="btn btn-primary mt-2"
          >
            Marquer comme lu
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
