import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { getTransactionsByMonth, getAllTransactions } from "../../services/apiService";
import IMAGES from "../../../assets/images";
import { Colors } from "../../../assets/colors";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";
import { useSelector, useDispatch } from "react-redux";

const HistoryScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const user = useSelector((state) => state.user?.user); 
  const userId = user.user.id; 

  console.log("User ID:", userId); 
   useEffect(() => {
    console.log('2')
    if (user?.user?.id) {
      fetchTransactions();
    }
  }, [currentTab]);
  const fetchTransactions = async () => {
    try {
      console.log("Fetching transactions for userId:", userId);
      const response = await getAllTransactions(userId);
  
      console.log("Fetched transactions:", response);
      if (response?.data) {
        let array = response.data;
  
        // Lọc dữ liệu dựa trên tab hiện tại
        let filteredTransactions = [...array];
        if (currentTab === 1) {
          // Chuyển tiền
          filteredTransactions = array.filter(
            (transaction) => transaction.act_type === "transfer"
          );
        } else if (currentTab === 2) {
          // Nhận tiền
          filteredTransactions = array.filter(
            (transaction) => transaction.act_type === "receive"
          );
        }
  
        // Sắp xếp theo ngày
        const sortedTransactions = filteredTransactions.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
  
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }
  
          return dateB.getTime() - dateA.getTime();
        });
  
        console.log("Filtered and sorted transactions:", sortedTransactions);
        setTransactions(sortedTransactions);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };
  
  

const renderTransactionItem = ({ item }: { item: any }) => (
  <TouchableOpacity style={styles.detailsItems}>
      <View style={styles.contentInner}>
          <Image
              resizeMode="contain"
              style={
                  item.act_type === "transfer"
                      ? styles.iconChuyentien
                      : styles.iconNhantien
              }
              source={
                  item.act_type === "transfer"
                      ? IMAGES.iconChuyentien
                      : IMAGES.iconNhantien
              }
          />
          <View>
              <Text numberOfLines={2}  style={styles.titleDetails}>
                  {item.act_type === "transfer"
                      ? `${item.transaction_log_message}`
                      : `${item.transaction_log_message}`}
              </Text>
              <Text style={styles.time}>
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
              </Text>
          </View>
      </View>
      <Text
          style={[
              styles.textMoneyAmount,
              { color: item.act_type === "transfer" ? "red" : "green" },
          ]}
      >
          {item.act_type === "transfer" ? `-${item.amount}` : `+${item.amount}`}
          <Text>đ</Text>
      </Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <View style={styles.subTab}>
        <TouchableOpacity
          style={[
            styles.subTabItem,
            currentTab === 0 ? styles.subTabItemActive : null,
          ]}
          onPress={() => setCurrentTab(0)}
        >
          <Text
            style={[
              styles.subTabText,
              currentTab === 0 ? styles.subTabTextActive : null,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subTabItem,
            currentTab === 1 ? styles.subTabItemActive : null,
          ]}
          onPress={() => setCurrentTab(1)}
        >
          <Text
            style={[
              styles.subTabText,
              currentTab === 1 ? styles.subTabTextActive : null,
            ]}
          >
            Chuyển tiền
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subTabItem,
            currentTab === 2 ? styles.subTabItemActive : null,
          ]}
          onPress={() => setCurrentTab(2)}
        >
          <Text
            style={[
              styles.subTabText,
              currentTab === 2 ? styles.subTabTextActive : null,
            ]}
          >
            Nhận tiền
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.transaction_id.toString()}
        renderItem={renderTransactionItem}
        contentContainerStyle={{ paddingHorizontal: widthScale(0) }}
        ListEmptyComponent={<Text>Không có giao dịch</Text>}
    />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.White,
    overflow: "hidden", // Add overflow hidden here

  },
  subTab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: heightScale(10),
    paddingHorizontal: widthScale(22),
  },
  subTabItem: {
    alignItems: "center",
    gap: widthScale(10),
    paddingVertical: heightScale(14),
    borderRadius: 18,
    width: "35%",
  },
  subTabItemActive: {
    backgroundColor: Colors.MainColor,
  },
  subTabText: {
    fontSize: fontScale(16),
    color: Colors.MainColor,
    fontWeight: "bold",
  },
  subTabTextActive: {
    color: Colors.White,
  },
  tabContent: {
    paddingHorizontal: widthScale(36),
    overflow: "hidden",  // Prevent overflow here as well
  },

  statementContainer: {
    marginTop: heightScale(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textDeposit: {
    fontSize: fontScale(20),
    color: "black",
    fontWeight: "600",
  },
  statementText: {
    color: Colors.MainColor,
    fontSize: fontScale(14),
  },
  contentInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

  },
  iconMuiten: {
    width: widthScale(10),
    height: heightScale(10),
    marginLeft: 5,
    tintColor: Colors.MainColor,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 0
  },
  detailsItems: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textMoneyAmount: {
    fontSize: fontScale(16),
    color: '#57be92',
    fontWeight: '600',
    marginRight: widthScale(20), // Dịch qua trái bằng cách thêm khoảng cách bên phải

  },
  iconNhantien: {
    width: widthScale(93),
    height: heightScale(83),
  },
  iconChuyentien: {
    width: widthScale(53),
    height: heightScale(53),
    marginLeft: widthScale(20),
    marginRight: widthScale(20),
  },
  titleDetails: {
    fontWeight: '600',
    fontSize: fontScale(14),
    width: widthScale(230), // Adjust the width as needed
    overflow: 'hidden', // Hide the overflow text
    textOverflow: 'ellipsis', // Show ellipsis when text overflows
    whiteSpace: 'nowrap', // Prevent text wrapping

  },
  time: {
    fontWeight: '400',
    fontSize: fontScale(12),
    color: '#919193'
  }
});
