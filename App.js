import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function CamButton(props){
//   return (
//     <View style={styles.container}>
//     <CameraView style={styles.camera} facing={facing}>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//           <MaterialCommunityIcons name="camera-flip" color={"#CCCCCC"} style={styles.cameraflip}/>
//         </TouchableOpacity>
//       </View>
//     </CameraView>
//   </View>
//   )
// }

export default function App() {
  const [facing, setFacing] = useState('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [dataScanned, setDataScanned] = useState("");
  
  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    // alert(`Bar code with data "${data}" has been scanned!`);
    setDataScanned(data);
  };

  const scanAgain = () => {
    setScanned(false);
  };

  // function getScannedResult() {
  //   if(BarCodeScanningResult()  != ""){

  //   }
  // }
  

  return (
    // <View>
    //   <Text style={styles.title} onPress={CamButton}>Hello, Press the button to scan a QR Code</Text>
    // </View>
    <View style={styles.container}>
    <CameraView 
    style={styles.camera} 
    facing={facing} 
    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    barCodeScannerSettings={{
    barCodeTypes: ["qr", 'aztec','ean13','ean8','qr','pdf417','upc_e','datamatrix','code39','code93','itf14','codabar','code128','upc_a' ],}}
    >
      <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <MaterialCommunityIcons name="magnify-scan" color={"#CCCCCC"} onPress={scanAgain} style={styles.scanicon}/>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="camera-flip" color={"#CCCCCC"} onPress={toggleCameraFacing} style={styles.cameraflip}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.data}>{dataScanned}</Text>
    </CameraView>
  </View>
  );
}

const styles = StyleSheet.create({
  
  title: {
    width: "100%",
    height: "100%",
    textAlignVertical: "center",
    textAlign: "center",
    color: "#000000",
    fontSize: 15,
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  
  camera: {
    flex: 1,
  },
  
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height:'100%',
    width:'100%',
  },
  button: {
    flex: 1,
    alignItems:"flex-end",
    height: '5%',
    marginTop: 50,
    marginRight:25,
  },
  
  cameraflip: {
   fontSize: 30,
  },

  scanicon: {
    flex: 1,
    alignSelf: 'left',
    fontSize: 30,
    marginTop: 50,
    marginLeft: 25,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  data:{
    color: "red",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "white"
  }
});
