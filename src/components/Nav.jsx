

const Nav = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [makeFilter, setMakeFilter] = useState('');
    const [costFilter, setCostFilter] = useState('');
    const [seatFilter, setSeatFilter] = useState('');
  