import { StyleSheet, SafeAreaView, Image, Dimensions, View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useState } from 'react';

export default function PaginatedCarousel({ propertyImages }) {

  const windowWidth = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        width={windowWidth}
        height={360}
        data={propertyImages}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
        mode="parallax"
        onSnapToItem={(index) => setCurrentIndex(index)}
        loop={false}
        pagingEnabled
      />
      <View style={styles.paginationContainer}>
        {propertyImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 360,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'grey',
    borderRadius: 15,
    transform: [{ scale: 1.1 }],
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: "center"
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#508D4E',
    width: 20,
    height: 6,
    marginHorizontal: 2,
  },
  inactiveDot: {
    backgroundColor: '#C4C4C4',
  },
});
