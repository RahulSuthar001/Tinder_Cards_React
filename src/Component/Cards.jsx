// MyCards.jsx
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import CatImageScreen from './ImageScreen';

const MyCards = () => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [lastDirection, setLastDirection] = useState(null);

  useEffect(() => {
    fetchCatImages();
  }, []);

  const fetchCatImages = async () => {
    try {
      const response = await fetch('https://cataas.com/api/cats?tags=cute');
      if (!response.ok) {
        throw new Error('Failed to fetch cat images');
      }
      const data = await response.json();
      setCats(data);
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
  };

  const handleSwipe = (direction, catId) => {
    console.log("Removing cat #" + catId);
    setLastDirection(direction);
  
  };

  const handleOutOfFrame = (catId) => {
    console.log("Cat #" + catId + " left the screen");
    
  };

  const handleSingleClick = (catId) => {

    handleSwipe('left', catId);
  };

  const handleDoubleClick = (catId) => {
    
    setSelectedCat(catId);
  };

  return (
    <div>
      {selectedCat ? (
        <CatImageScreen selectedCat={selectedCat} onBack={() => setSelectedCat(null)} />
      ) : (
        <div>
          <h1>React Tinder Card</h1>
          <div className='cardContainer'>
            {cats.map((cat, index) => (
              <TinderCard
                className='swipe'
                key={cat._id}
                onSwipe={(dir) => handleSwipe(dir, cat._id)}
                onCardLeftScreen={() => handleOutOfFrame(cat._id)}
              >
                <div
                  style={{ backgroundImage: `url(https://cataas.com/cat/${cat._id})` }}
                  className='card'
                  onClick={() => handleSingleClick(cat._id)}
                  onDoubleClick={() => handleDoubleClick(cat._id)}
                >
                  <h3>Cute Cat</h3> 
                </div>
              </TinderCard>
            ))}
          </div>
          {lastDirection && <h2 className='infoText'>You swiped {lastDirection}</h2>}
        
    
        </div>
      )}
    </div>
  );
};

export default MyCards;
