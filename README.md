## Простейший стор для связывания с состояниями компонента
Позволяет без дополнительных затрат использовать один и тот же ключ стора для отслеживания в нескольких компонентах.


### Подключение модуля
```js
import { stor } from 'wsp-react-stor';
```


### Функциональный компонент
```js
const Component = () => {
  const [stateVal, setStateVal] = useState(
		stor.getStor('storKey')
	);

  stor.bindStor('storKey', setStateVal);

  return (
    <div onClick={stor.setStor('storKey', 'newValue')}>
      {stateVal}
    </div>
  );
};
```


### Классовый компонент
```js
class Component extends React.Component {
  bindStorKey = false;

  constructor(props) {
    super(props);

    this.state = {
      stateKey: stor.getStor('storKey')
    };
  };

  componentDidMount() {
    this.bindStorKey = stor.bindStor(
      'storKey', (storVal) => {
        this.setState({
          stateKey: storVal
        })
      }
    );
  };

  componentWillUnmount() {
    stor.unbindStor(
      'storKey', this.bindStorKey
    );
  };

  render () {
    return (
      <div onClick={stor.setStor('storKey', 'newValue')}>
        {this.state.stateKey}
      </div>
    );
  };
};
```
