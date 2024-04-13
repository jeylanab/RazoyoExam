

const Nav = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [makeFilter, setMakeFilter] = useState('');
    const [costFilter, setCostFilter] = useState('');
    const [seatFilter, setSeatFilter] = useState('');
    useEffect(() => {
        const fetchCars = async () => {
          try {
            let url = 'https://exam.razoyo.com/api/cars';
            const filters = [];
            if (makeFilter) {
              filters.push(`make=${makeFilter}`);
            }
            if (costFilter) {
              filters.push(`cost=${costFilter}`);
            }
            if (seatFilter) {
              filters.push(`seat=${seatFilter}`);
            }
            if (filters.length > 0) {
              url += `?${filters.join('&')}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setCars(data.cars);
          } catch (error) {
            console.error('Error fetching cars:', error);
          }
        };
    
        fetchCars();
      }, [makeFilter, costFilter, seatFilter]);
    
      const fetchCarDetails = async (id) => {
        try {
          const token = localStorage.getItem('Your-Token'); // Assuming token is stored in localStorage
          const response = await fetch(`https://exam.razoyo.com/api/cars/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          });
          const data = await response.json();
          setSelectedCar(data.car);
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      };
    
      const handleCloseDetails = () => {
        setSelectedCar(null);
      };
    
      const applyFilters = () => {
        // Fetch cars based on filters
      };