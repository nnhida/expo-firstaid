import Image from 'next/image';
import { PiAmbulanceLight } from 'react-icons/pi';
import { RiCustomerServiceLine } from 'react-icons/ri';
import { LiaMicroscopeSolid } from 'react-icons/lia';
import { postProps } from '@/types/type';

// Import other components similarly

interface uiProps {
  postListHome: postProps[] | undefined;
}

export default function Ui({ postListHome }: uiProps) {
  return (
    <div>
      <section
        id="home"
        className=" flex items-center justify-between p-40  w-screen h-screen"
      >
        <img
          src={'/home.png'}
          width={500}
          height={500}
          alt="home"
        />
        <div className="flex-col space-y-10">
          <p className="text-6xl font-semibold">
            <span className="text-blue-500">We care</span>
            <br />
            about your health
          </p>
          <p className="text-xl text-gray-400">Good health is state of mental, physical and social well being and it does not mean absence of desease.</p>
          <button className="px-3 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all">See More About Us</button>
        </div>
      </section>

      <section
        id="about"
        className=" flex items-center justify-between px-40 w-screen"
      >
        <div className="flex-col space-y-20">
          <p className="text-6xl font-semibold ">About Us</p>
          <p className="text-xl text-gray-400 ">
            Your trusted partner in health. We provide comprehensive healthcare services, from routine check-ups to specialized treatments. Our dedicated team of experienced professionals is committed to delivering compassionate care and
            exceptional outcomes
          </p>
        </div>
        <img
          src={'/about-2.png'}
          width={500}
          height={500}
          alt="home"
        />
      </section>

      <section
        id="service"
        className="h-[80vh] w-full flex justify-center items-center"
      >
        <div className="flex-col space-y-32 w-max">
          <div className="flex-col space-y-3">
            <p className="text-5xl text-center ">Our Medical Service</p>
            <p className="text-2xl text-center text-gray-400 ">We are dedicated to serve you best medical services</p>
          </div>
          <div className="flex space-x-10">
            {[
              {
                icon: PiAmbulanceLight,
                title: 'Emergency Ambulance',
              },
              {
                icon: RiCustomerServiceLine,
                title: '24 Hours Call Center',
              },
              {
                icon: LiaMicroscopeSolid,
                title: 'Well Equiped Lab',
              },
              {
                icon: PiAmbulanceLight,
                title: 'Emergency Ambulance',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex-col group space-y-5 w-64 p-5 rounded-xl hover:bg-blue-700 shadow-xl transition-all"
              >
                <item.icon className="size-32 mx-auto fill-blue-700 group-hover:fill-white" />
                <p className="text-xl group-hover:text-white text-center">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="doctor"
        className="h-screen w-full flex justify-center items-center"
      >
        <div className="flex-col space-y-32 w-max">
          <div className="flex-col space-y-3">
            <p className="text-5xl text-center ">Meet Our Doctor</p>
            <p className="text-2xl text-center text-gray-400 ">Qualified doctor that ready to serve you</p>
          </div>
          <div className="flex space-x-20 justify-center">
            {[
              {
                name: 'Dr. John Doe',
                img: 'doctor-1.jpg',
                specialty: 'Cardiologist',
              },
              {
                name: 'Dr. Jane Smith',
                img: 'doctor-2.jpg',
                specialty: 'Pediatrician',
              },
              {
                name: 'Dr. Emily Johnson',
                img: 'doctor-3.jpg',
                specialty: 'Dermatologist',
              },
            ].map((doctor, index) => (
              <div
                key={index}
                className=" bg-white flex-col space-y-4 rounded-lg shadow-lg p-4 w-56 h-80 hover:scale-110 transition-all"
              >
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  width={160}
                  height={160}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl text-center font-semibold text-blue-600 mt-2">{doctor.name}</h3>
                  <p className="text-center text-gray-600">{doctor.specialty}</p>
                </div>
                <button className="w-full py-1 border-2 border-blue-600 rounded-full group hover:bg-blue-600 hover:border-white transition-all">
                  <p className="text-blue-600 font-semibold group-hover:text-white">Book an Appointment</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="blog"
        className=" flex items-center w-screen h-screen"
      >
        <div className="flex-col space-y-10">
          <p className="text-6xl font-semibold ml-20">See Our News</p>

          <div className=" hideScroll w-screen py-5 overflow-x-scroll">
            <div className="flex space-x-10 px-10 w-max">
              {postListHome !== undefined &&
                postListHome.map((post, index) => (
                  <div
                    key={index}
                    className="flex-col space-y-5 bg-white rounded-lg shadow-lg p-2 w-64"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={128}
                      height={128}
                      className=" mx-auto"
                    />
                    <div>
                      <h3 className="text-xl text-center text-blue-600">{post.title}</h3>
                      <p className="text-center text-gray-600 line-clamp-4">{post.desc}</p>
                    </div>
                    <button className="mx-auto bg-blue-600 mt-auto text-white py-2 px-4 rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition duration-200">See More</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 w-screen bg-gray-100"
      >
        <h1 className="text-4xl text-center text-blue-600 mb-4">Contact Us</h1>
        <h3 className="text-2xl text-center text-gray-700 mb-12">Get in touch with us</h3>

        <form className="w-4/5 mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <label className="block text-gray-700">Message</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
