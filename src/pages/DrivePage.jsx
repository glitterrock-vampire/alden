import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Fuel,
  Luggage,
  MapPin,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createContactMailto } from '@/lib/contact';
import './DrivePage.css';

const VEHICLES = [
  {
    id: 'city-compact',
    name: 'City Compact',
    category: 'Compact',
    description: 'Easy to park, light on fuel, ready for Kingston.',
    price: 55,
    seats: 4,
    bags: 2,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Modern compact car parked on a city street',
    tag: 'City favourite',
  },
  {
    id: 'island-crossover',
    name: 'Island Crossover',
    category: 'Crossover',
    description: 'Extra room and a higher ride for days on the road.',
    price: 82,
    seats: 5,
    bags: 3,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Crossover vehicle ready for a road trip',
    tag: 'More room',
  },
  {
    id: 'family-suv',
    name: 'Family SUV',
    category: 'SUV',
    description: 'Room for the crew, luggage, and the long way round.',
    price: 108,
    seats: 5,
    bags: 4,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'SUV on a scenic road',
    tag: 'Island ready',
  },
  {
    id: 'group-van',
    name: 'Group Van',
    category: 'Family',
    description: 'Bring everyone along with flexible space for the trip.',
    price: 138,
    seats: 7,
    bags: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Spacious passenger van parked outdoors',
    tag: 'Group travel',
  },
];

const VEHICLE_FILTERS = ['All cars', 'Compact', 'Crossover', 'SUV', 'Family'];
const PICKUP_LOCATIONS = [
  'Norman Manley Airport (KIN)',
  'Kingston',
  'Montego Bay Airport (MBJ)',
  'Ocho Rios',
];

const toLocalDateInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const calculateDays = (start, end) => {
  if (!start || !end) return 1;
  const startDate = new Date(`${start}T12:00:00`);
  const endDate = new Date(`${end}T12:00:00`);
  return Math.max(1, Math.ceil((endDate - startDate) / 86400000));
};

export default function DrivePage() {
  const today = new Date();
  const [pickupDate, setPickupDate] = useState(toLocalDateInput(addDays(today, 1)));
  const [returnDate, setReturnDate] = useState(toLocalDateInput(addDays(today, 4)));
  const [pickupLocation, setPickupLocation] = useState(PICKUP_LOCATIONS[0]);
  const [activeFilter, setActiveFilter] = useState('All cars');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [guest, setGuest] = useState({ name: '', email: '', phone: '' });

  const rentalDays = useMemo(
    () => calculateDays(pickupDate, returnDate),
    [pickupDate, returnDate],
  );

  const filteredVehicles = useMemo(
    () => activeFilter === 'All cars'
      ? VEHICLES
      : VEHICLES.filter((vehicle) => vehicle.category === activeFilter),
    [activeFilter],
  );

  const requestHref = selectedVehicle
    ? createContactMailto('ALDEN Drive — rental request', {
      Name: guest.name,
      Email: guest.email,
      Phone: guest.phone,
      Vehicle: selectedVehicle.name,
      'Estimated rate': `USD $${selectedVehicle.price} per day`,
      'Estimated rental total': `USD $${(selectedVehicle.price * rentalDays).toFixed(2)} for ${rentalDays} days`,
      'Pickup location': pickupLocation,
      'Pickup date': pickupDate,
      'Return date': returnDate,
    })
    : '#request';

  const handleSearch = (event) => {
    event.preventDefault();
    setFormError('');

    if (returnDate <= pickupDate) {
      setFormError('Choose a return date after your pickup date.');
      return;
    }

    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    if (!selectedVehicle) return;
    setRequestSent(true);
    window.location.href = requestHref;
  };

  const startRequest = (vehicle) => {
    setSelectedVehicle(vehicle);
    setRequestSent(false);
    setFormError('');
    window.setTimeout(() => {
      document.getElementById('request')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  };

  return (
    <main className="drive-app">
      <header className="drive-header">
        <Link to="/" className="drive-brand" aria-label="ALDEN home">
          <span className="drive-brand-mark">A</span>
          <span>ALDEN <strong>DRIVE</strong></span>
        </Link>

        <nav className="drive-nav" aria-label="Main navigation">
          <a href="#fleet">The fleet</a>
          <a href="#how-it-works">How it works</a>
          <a href="#faq">FAQs</a>
        </nav>

        <a className="drive-header-cta" href="#search">
          Find a car <ArrowRight size={16} aria-hidden="true" />
        </a>
      </header>

      <section className="drive-hero" aria-labelledby="drive-heading">
        <div className="drive-hero-image" role="img" aria-label="Car on a coastal road in Jamaica" />
        <div className="drive-hero-shade" />

        <div className="drive-hero-content">
          <div className="drive-kicker"><span /> CAR RENTAL, JAMAICA</div>
          <h1 id="drive-heading">The island<br /><em>is yours.</em></h1>
          <p>Good cars. Clear rates. More time for the road that brought you here.</p>
          <a className="drive-hero-link" href="#search">
            Find your ride <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="drive-hero-note">
          <span>01 / 04</span>
          <span>Take the scenic route.</span>
        </div>
      </section>

      <section id="search" className="drive-search-section">
        <form className="drive-search" onSubmit={handleSearch}>
          <label className="drive-search-field drive-location-field">
            <span><MapPin size={16} aria-hidden="true" /> Pick-up location</span>
            <select value={pickupLocation} onChange={(event) => setPickupLocation(event.target.value)}>
              {PICKUP_LOCATIONS.map((location) => <option key={location}>{location}</option>)}
            </select>
            <ChevronDown className="drive-select-chevron" size={16} aria-hidden="true" />
          </label>

          <label className="drive-search-field">
            <span><CalendarDays size={16} aria-hidden="true" /> Pick-up date</span>
            <input type="date" min={toLocalDateInput(today)} value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} required />
          </label>

          <label className="drive-search-field">
            <span><CalendarDays size={16} aria-hidden="true" /> Return date</span>
            <input type="date" min={pickupDate || toLocalDateInput(today)} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required />
          </label>

          <button className="drive-search-button" type="submit">Search cars <ArrowRight size={17} aria-hidden="true" /></button>
        </form>
        {formError && <p className="drive-inline-error" role="alert">{formError}</p>}
        <p className="drive-sample-note">Sample fleet and rates shown in USD. Availability and final pricing are confirmed by our team.</p>
      </section>

      <section id="fleet" className="drive-fleet-section">
        <div className="drive-section-heading">
          <div>
            <p className="drive-eyebrow">YOUR NEXT GOOD DRIVE</p>
            <h2>Find your<br /><em>kind of ride.</em></h2>
          </div>
          <p className="drive-section-intro">From a quick Kingston run to a full island loop, pick the room and range that fit your plans.</p>
        </div>

        <div className="drive-fleet-toolbar">
          <div className="drive-filter-list" role="group" aria-label="Filter cars by type">
            {VEHICLE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'is-active' : ''}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="drive-result-count">{filteredVehicles.length} vehicles</span>
        </div>

        <div className="drive-vehicle-grid">
          {filteredVehicles.map((vehicle, index) => (
            <article className="drive-vehicle-card" key={vehicle.id}>
              <div className="drive-vehicle-image-wrap">
                <img src={vehicle.image} alt={vehicle.imageAlt} loading={index > 1 ? 'lazy' : 'eager'} />
                <span className="drive-vehicle-tag">{vehicle.tag}</span>
              </div>
              <div className="drive-vehicle-body">
                <div className="drive-vehicle-title-row">
                  <div>
                    <span className="drive-vehicle-category">{vehicle.category}</span>
                    <h3>{vehicle.name}</h3>
                  </div>
                  <p className="drive-vehicle-price"><strong>${vehicle.price}</strong><span>USD / day</span></p>
                </div>
                <p className="drive-vehicle-description">{vehicle.description}</p>
                <div className="drive-vehicle-specs">
                  <span><Users size={15} aria-hidden="true" /> {vehicle.seats} seats</span>
                  <span><Luggage size={15} aria-hidden="true" /> {vehicle.bags} bags</span>
                  <span><Fuel size={15} aria-hidden="true" /> {vehicle.transmission}</span>
                </div>
                <button className="drive-vehicle-cta" type="button" onClick={() => startRequest(vehicle)}>
                  Request this car <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="drive-steps-section">
        <div className="drive-steps-heading">
          <p className="drive-eyebrow">SIMPLE FROM START TO ROAD</p>
          <h2>Three steps.<br /><em>Then go.</em></h2>
        </div>
        <div className="drive-steps-grid">
          <article><span>01</span><MapPin size={21} aria-hidden="true" /><h3>Choose your pick-up</h3><p>Tell us where and when you want to start your trip.</p></article>
          <article><span>02</span><CarFront size={21} aria-hidden="true" /><h3>Pick your car</h3><p>Compare the sample fleet and choose a ride that suits your plans.</p></article>
          <article><span>03</span><ShieldCheck size={21} aria-hidden="true" /><h3>Confirm together</h3><p>Send an enquiry. Our team will confirm availability and the final quote.</p></article>
        </div>
      </section>

      {selectedVehicle && (
        <section id="request" className="drive-request-section">
          <div className="drive-request-summary">
            <p className="drive-eyebrow">YOUR TRIP, YOUR WAY</p>
            <h2>Request a<br /><em>{selectedVehicle.name}.</em></h2>
            <p className="drive-request-copy">Share your details and we’ll prepare a rental enquiry for you to send. Your reservation is only confirmed after our team checks availability and replies.</p>
            <div className="drive-trip-details">
              <span><CarFront size={16} aria-hidden="true" /> {selectedVehicle.name}</span>
              <span><MapPin size={16} aria-hidden="true" /> {pickupLocation}</span>
              <span><CalendarDays size={16} aria-hidden="true" /> {pickupDate} → {returnDate} · {rentalDays} days</span>
              <strong>Estimated total <b>USD ${(selectedVehicle.price * rentalDays).toFixed(2)}</b></strong>
            </div>
          </div>

          <form className="drive-request-form" onSubmit={handleRequestSubmit}>
            <div className="drive-form-heading">
              <div><span>BOOKING ENQUIRY</span><h3>Your details</h3></div>
              <button type="button" aria-label="Clear selected vehicle" onClick={() => { setSelectedVehicle(null); setRequestSent(false); }}><X size={18} aria-hidden="true" /></button>
            </div>
            <label htmlFor="drive-name">Full name</label>
            <input id="drive-name" autoComplete="name" value={guest.name} onChange={(event) => setGuest({ ...guest, name: event.target.value })} required />
            <label htmlFor="drive-email">Email address</label>
            <input id="drive-email" type="email" autoComplete="email" value={guest.email} onChange={(event) => setGuest({ ...guest, email: event.target.value })} required />
            <label htmlFor="drive-phone">Phone number</label>
            <input id="drive-phone" type="tel" autoComplete="tel" value={guest.phone} onChange={(event) => setGuest({ ...guest, phone: event.target.value })} required />
            {requestSent && <p className="drive-request-success" role="status"><Check size={16} aria-hidden="true" /> Your email app should open with the enquiry details. The rental is not confirmed until our team replies.</p>}
            <button className="drive-send-request" type="submit">Prepare booking enquiry <ArrowRight size={17} aria-hidden="true" /></button>
            <p className="drive-form-privacy">Your details are included only in the email enquiry you choose to send.</p>
          </form>
        </section>
      )}

      <section id="faq" className="drive-faq-section">
        <div><p className="drive-eyebrow">GOOD TO KNOW</p><h2>Before you<br /><em>set off.</em></h2></div>
        <div className="drive-faq-list">
          <details><summary>Are these cars available to book now?<ChevronDown size={18} aria-hidden="true" /></summary><p>This is a booking concept with sample vehicles and rates. Send an enquiry and the team can confirm the real fleet and availability.</p></details>
          <details><summary>What does the displayed price include?<ChevronDown size={18} aria-hidden="true" /></summary><p>The daily rates are examples for this prototype. A final quote, insurance details, deposit, and any delivery fees must be confirmed before booking.</p></details>
          <details><summary>Do I pay online?<ChevronDown size={18} aria-hidden="true" /></summary><p>No online payment is collected here. Your email enquiry is a request only; ALDEN Drive will confirm the booking terms directly.</p></details>
        </div>
      </section>

      <footer className="drive-footer">
        <Link to="/" className="drive-brand" aria-label="Return to ALDEN home">
          <span className="drive-brand-mark">A</span>
          <span>ALDEN <strong>DRIVE</strong></span>
        </Link>
        <p>Sample booking experience · Kingston, Jamaica</p>
        <a href="mailto:aldenwebstudios@gmail.com">Talk to our team <ArrowRight size={15} aria-hidden="true" /></a>
      </footer>
    </main>
  );
}
