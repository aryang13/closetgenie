import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Button from './components/Button';
import { useNavigation } from '@react-navigation/native';
import imageController from '../controllers/imageController';

export default function CameraScreen() {
    const navigation = useNavigation();
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [base64, setBase64] = useState(null);
    const cameraRef = useRef(null);

    const getCameraPermission = async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
    }

    useEffect(() => {
        getCameraPermission();
    }, []);

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                height: 0,
                display: 'none',
            },
            tabBarVisible: false,
            tabBarButton: () => null,
          });
          return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined,
            tabBarVisible: undefined,
            tabBarButton: undefined,
          });
    }, [navigation]);
    
    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync({base64: true});
                setImage(data.uri);
                setBase64(data.base64);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const uploadImage = async () => {
        if(image) {
            try {
                const response = await imageController.upload(base64);
                alert(`You added a ${response.type} to your closet!`);
                setImage(null);
                setBase64(null);
                navigation.navigate('Closet');
            } catch (e) {
                console.log(e);
            }
        }
    }

    if(hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {!image ? 
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={cameraRef}
                >
                    <View style={styles.topButtons}>
                        <Button 
                            icon='retweet' 
                            onPress={() => {
                                setType(type == CameraType.back ? CameraType.front : CameraType.back)
                            }}
                        />
                    </View>
                </Camera>
                :
                <Image 
                    source={{uri: image}} 
                    style={styles.camera}
                />
            }
            <View>
                {image ? 
                    <View style={styles.image}>
                        <Button title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
                        <Button title={"Upload"} icon="check" onPress={uploadImage}/>
                    </View>
                    :
                    <Button title={"Take Picture"} icon="camera" onPress={takePicture} color={'black'}/>
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    },
    image: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 50
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    }
});