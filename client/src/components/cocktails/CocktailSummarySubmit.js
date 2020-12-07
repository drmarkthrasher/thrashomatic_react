import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Divider } from '@material-ui/core';
import { GlobalContext } from '../../context/GlobalState';
import { WaveTopBottomLoading, LoopCircleLoading } from 'react-loadingg';

import GET_COCKTAIL from '../../apollo/cocktails/queries/getCocktail';

const CocktailSummarySubmit = (props) => {
  const { device, server, service } = useContext(GlobalContext);

  const id = props.match.params.id;

  const [cocktailName, setCocktailName] = useState('Default Name');
  const [otherIngredients, setOtherIngredients] = useState('None');
  const [liquors, setLiquors] = useState([]);
  const [totalShots, setTotalShots] = useState(0);
  // state for bluetooth
  // const [device, setDevice] = useState('');
  const [deviceName, setDeviceName] = useState('No device yet');
  // const [server, setServer] = useState('');
  // const [service, setService] = useState('');
  let [connected, setConnected] = useState(false);
  let [waiting, setWaiting] = useState(false);
  let [drink1Characteristic, setDrink1Characteristic] = useState('');
  let [drink2Characteristic, setDrink2Characteristic] = useState('');
  let [drink3Characteristic, setDrink3Characteristic] = useState('');
  let [drink4Characteristic, setDrink4Characteristic] = useState('');
  let [drink5Characteristic, setDrink5Characteristic] = useState('');
  let [drink6Characteristic, setDrink6Characteristic] = useState('');
  let [drink7Characteristic, setDrink7Characteristic] = useState('');
  let [drink8Characteristic, setDrink8Characteristic] = useState('');
  let [uploadComplete, setUploadComplete] = useState('');
  let [drinkPreperationComplete, setDrinkPreperationComplete] = useState('');
  let [submitButtonReady, setSubmitButtonReady] = useState(false);

  const sumShots = (liqdata) => {
    const totalShots = liqdata
      .map((item) => (item.isChecked ? item.amount : null))
      .reduce((prev, next) => prev + next);
    setTotalShots(totalShots);
  };

  useEffect(() => {
    // Note: device, server, and service are now stored in Context api
    setDeviceName(device.name);
    onConnect();
  }, [liquors]);

  const onConnect = async () => {
    // Note: device, server, and service now come from Context API.
    // They are stored there from the MainAppBar component (menu drawer)
    try {
      setWaiting(true);

      setDrink1Characteristic(
        await service.getCharacteristic('00002101-0000-1000-8000-00805f9b34fb')
      );
      // setDrink1Characteristic(drink1Char);
      setDrink2Characteristic(
        await service.getCharacteristic('00002102-0000-1000-8000-00805f9b34fb')
      );
      setDrink3Characteristic(
        await service.getCharacteristic('00002103-0000-1000-8000-00805f9b34fb')
      );
      setDrink4Characteristic(
        await service.getCharacteristic('00002104-0000-1000-8000-00805f9b34fb')
      );
      setDrink5Characteristic(
        await service.getCharacteristic('00002105-0000-1000-8000-00805f9b34fb')
      );
      setDrink6Characteristic(
        await service.getCharacteristic('00002106-0000-1000-8000-00805f9b34fb')
      );
      setDrink7Characteristic(
        await service.getCharacteristic('00002107-0000-1000-8000-00805f9b34fb')
      );
      setDrink8Characteristic(
        await service.getCharacteristic('00002108-0000-1000-8000-00805f9b34fb')
      );

      setUploadComplete(
        await service.getCharacteristic('00002109-0000-1000-8000-00805f9b34fb')
      );
      let drinkPreperationComplete = await service.getCharacteristic(
        '00002110-0000-1000-8000-00805f9b34fb'
      );
      setSubmitButtonReady(true);
      setConnected(true);
      setWaiting(false);

      await drinkPreperationComplete.startNotifications();
      drinkPreperationComplete.addEventListener(
        'characteristicvaluechanged',
        (event) => {
          const value = event.target.value;
          console.log(value.getUint8(0));
          setSubmitButtonReady(true);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onDisconnect = async () => {
    if (device.gatt.connected) {
      device.gatt.disconnect();
      setDeviceName('No device yet');
      setDrink1Characteristic('');
      setDrink2Characteristic('');
      setDrink3Characteristic('');
      setDrink4Characteristic('');
      setDrink5Characteristic('');
      setDrink6Characteristic('');
      setDrink7Characteristic('');
      setDrink8Characteristic('');
      setUploadComplete('');
      setDrinkPreperationComplete('');
      setSubmitButtonReady(false);
      setConnected(false);
    }
  };

  const onSubmitDrink = async () => {
    if (drink1Characteristic) {
      console.log('Device is now connected');

      setSubmitButtonReady(false);

      drink1Characteristic.writeValue(
        Float32Array.of(liquors[0].isChecked ? liquors[0].amount : 0)
      );
      drink2Characteristic.writeValue(
        Float32Array.of(liquors[1].isChecked ? liquors[1].amount : 0)
      );
      drink3Characteristic.writeValue(
        Float32Array.of(liquors[2].isChecked ? liquors[2].amount : 0)
      );
      drink4Characteristic.writeValue(
        Float32Array.of(liquors[3].isChecked ? liquors[3].amount : 0)
      );
      drink5Characteristic.writeValue(
        Float32Array.of(liquors[4].isChecked ? liquors[4].amount : 0)
      );
      drink6Characteristic.writeValue(
        Float32Array.of(liquors[5].isChecked ? liquors[5].amount : 0)
      );
      drink7Characteristic.writeValue(
        Float32Array.of(liquors[6].isChecked ? liquors[6].amount : 0)
      );
      drink8Characteristic.writeValue(
        Float32Array.of(liquors[7].isChecked ? liquors[7].amount : 0)
      );

      // const newbuffer = new ArrayBuffer(numbytes);
      // const complete = new Int8Array(newbuffer);
      // complete[0] = 1;

      var complete = Uint8Array.of(1);
      uploadComplete.writeValue(complete);

      // let value = await characteristic.readValue();
      // console.log(value);
    } else {
      console.log('No connection yet');
    }
  };

  const { data } = useQuery(GET_COCKTAIL, {
    variables: { id: id },
    skip: !id,
    onCompleted(data) {
      setCocktailName(data.getCocktail.name);
      setOtherIngredients(data.getCocktail.otherIngredients);
      setLiquors(data.getCocktail.liquors);
      sumShots(data.getCocktail.liquors);
    },
  });

  return (
    <div>
      {waiting ? <LoopCircleLoading /> : null}

      <p>Summary Page ID: {id}</p>
      <Link to='/cocktails'>Back to list</Link>
      <p></p>
      <Button
        color='primary'
        variant='outlined'
        onClick={() => {
          connected ? onDisconnect() : onConnect();
        }}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </Button>
      <p>Connected to:</p>
      <h3>{deviceName}</h3>
      <p></p>
      <Divider />
      <p>Cocktail: {cocktailName}</p>
      {liquors.map((liquor, index) => (
        <p key={liquor.index}>
          {liquor.title} Shots: {liquor.isChecked ? liquor.amount : '0'}
        </p>
      ))}
      <h4>Other Ingredients/Directions: {otherIngredients}</h4>
      <h4>Total Liquor Shots: {totalShots}</h4>

      <p></p>
      <Button
        variant='contained'
        color='primary'
        disabled={submitButtonReady ? false : true}
        onClick={() => onSubmitDrink()}
      >
        {submitButtonReady ? 'Submit Cocktail' : 'Not Ready'}
      </Button>
    </div>
  );
};

export default CocktailSummarySubmit;
