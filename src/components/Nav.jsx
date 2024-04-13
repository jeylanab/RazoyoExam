

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
    return (
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4">
            <select
              value={makeFilter}
              onChange={(e) => setMakeFilter(e.target.value)}
              className="w-1/3 py-2 px-4 border border-gray-300 rounded-lg"
            >
              <option value="">All Makes</option>
              {/* Populate options with available makes */}
            </select>
            <input
              type="number"
              value={costFilter}
              onChange={(e) => setCostFilter(e.target.value)}
              placeholder="Enter Cost"
              className="w-1/3 ml-4 py-2 px-4 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              value={seatFilter}
              onChange={(e) => setSeatFilter(e.target.value)}
              placeholder="Enter Seat"
              className="w-1/3 ml-4 py-2 px-4 border border-gray-300 rounded-lg"
            />
            <button onClick={applyFilters} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply Filters
            </button>
          </div>
    
          <div className="grid grid-cols-3 gap-4">
            {cars.map((car) => (
              <div key={car.id} className="border border-gray-300 rounded-lg p-4">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <img src={car.image} alt={car.name} className="w-full mt-2 mb-2" />
                <p className="text-gray-600">Price: {car.price}</p>
                <button onClick={() => fetchCarDetails(car.id)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Open
                </button>
                {selectedCar && selectedCar.id === car.id && (
                  <div>
                    <h4 className="text-lg font-semibold mt-4">Car Details</h4>
                    <p>Seats: {selectedCar.seats}</p>
                    <p>MPG: {selectedCar.mpg}</p>
                    <p>Description: {selectedCar.description}</p>
                    <button onClick={handleCloseDetails} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Close
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default Nav;
    