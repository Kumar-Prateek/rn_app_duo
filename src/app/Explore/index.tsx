/// <reference path="../../index.d.ts" />
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {ClearStorage} from '../../asyncStorage';
import TextInputAvoidingView from '../../components/KeyBoardAvoidingView';
import ModalView from '../../components/ModalView';
import ScreenWrapper from '../../layout/ScreenWrapper';
import {colorWhite} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';

const imageArr = [
  {img: require('../../assets/explore1.jpeg')},
  {img: require('../../assets/explore2.jpeg')},
  {img: require('../../assets/explore3.jpeg')},
  {img: require('../../assets/explore1.jpeg')},
  {img: require('../../assets/explore2.jpeg')},
  {img: require('../../assets/explore3.jpeg')},
  {img: require('../../assets/explore1.jpeg')},
  {img: require('../../assets/explore2.jpeg')},
  {img: require('../../assets/explore3.jpeg')},
  {img: require('../../assets/explore1.jpeg')},
  {img: require('../../assets/explore2.jpeg')},
  {img: require('../../assets/explore3.jpeg')},
];

export default function Explore() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);
  const [img, setImg] = useState<any>(null);

  const handleOpen = (idx: any) => {
    setImg(idx);
  };

  useEffect(() => {
    if (img) {
      setVisible(true);
    }
  }, [img]);

  const handleClose = () => {
    setVisible(false);
    setImg(null);
  };
  return (
    <TextInputAvoidingView>
      <ScreenWrapper
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}>
        <View>
          <View
            style={[
              MainStyles.flexRow,
              {justifyContent: 'space-between'},
              MainStyles.backgroundDark,
              SpaceStyles.py1,
            ]}>
            <Text
              style={[TextStyles.colorGray, SpaceStyles.p5]}
              variant="titleMedium">
              Information
            </Text>
            <View>
              <IconButton
                icon="logout"
                iconColor={colorWhite}
                size={20}
                onPress={async () => await ClearStorage(navigation.navigate)}
              />
            </View>
          </View>
          <View style={styles.touchableFlex}>
            <View style={styles.touchableView1}>
              {imageArr?.map((item, index) => (
                <View style={[{width: '48%'}]} key={index}>
                  <TouchableOpacity onPress={() => handleOpen(item.img)}>
                    <Image
                      source={item.img}
                      style={styles.imageStyles}
                      accessibilityIgnoresInvertColors
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <ModalView visible={visible} emptyHeight="20%">
            <View style={styles.modal}>
              <View style={styles.touchableView}>
                <TouchableOpacity onPress={() => handleClose()}>
                  <Text style={styles.font24}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.widthFull}>
                {img ? (
                  <Image
                    source={img}
                    style={styles.image}
                    accessibilityIgnoresInvertColors
                  />
                ) : null}
              </View>
            </View>
          </ModalView>
        </View>
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
}

const styles = StyleSheet.create({
  widthFull: {
    width: '100%',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  imageStyles: {
    width: 190,
    height: 190,
    resizeMode: 'cover',
  },
  image: {width: '100%', height: '100%', minHeight: 400, resizeMode: 'contain'},
  touchableView: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: 28,
    paddingHorizontal: 7,
    marginVertical: 2,
    display: 'flex',
    alignSelf: 'flex-end',
  },
  font24: {fontSize: 24},
  touchableView1: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchableFlex: {flex: 1, marginVertical: 10},
});
