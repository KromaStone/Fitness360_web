import { fadeIn } from "../assets/utils/motion"
import { motion } from "framer-motion";
import profilePic from '../assets/images/profilePic.jpg'
import profileBanner from '../assets/images/profileBanner.jpg'
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useApplicationUser } from "../utils/ApplicationUserContext";
import { getUserDetails, getUsersAllDetails } from "../services/userServices/UserData";
import { Button, ButtonGroup, Input } from "@nextui-org/react";

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    contactNumber: "0",
    email: "",
    profilePicture: "",
    address: "",
    city: "",
    state: ""
  });

  const [activeTab, setActiveTab] = useState('tab1');
  const { appUserId } = useApplicationUser();
  const [isEdit, setIsEdit] = useState(false)
  const tabs = ['tab1', 'tab2', 'tab3'];

  useEffect(() => {
    document.title = 'Profile | Fitness360'
    GetUserDetails()
  }, [])


  const GetUserDetails = async () => {
    try {
      const result = await getUsersAllDetails(appUserId)
      setUser(result);
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  const editDetails = async () => {
    setIsEdit(!isEdit)
  }

  const userInfo = [
    { label: 'First Name', name: 'firstName', value: user.firstName },
    { label: 'Last Name', name: 'lastName', value: user.lastName },
    { label: 'Gender', name: 'gender', value: user.gender },
    { label: 'Age', name: 'age', value: user.age },
    { label: 'Height', name: 'height', value: user.height },
    { label: 'Weight', name: 'weight', value: user.weight },
    { label: 'Email', name: 'email', value: user.email },
    { label: 'Contact Number', name: 'contactNumber', value: user.contactNumber },
    { label: 'Profile Picture URL', name: 'profilePicture', value: user.profilePicture },
    { label: 'Address', name: 'address', value: user.address },
    { label: 'City', name: 'city', value: user.city },
    { label: 'State', name: 'state', value: user.state }
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const cancelEditClick = () => {
    GetUserDetails()
    setIsEdit(false)
  }
  const content = {
    tab1: (
      <motion.div initial='hidden' animate='show' variants={fadeIn("", "", .1, 0.5)} className="p-0 sm:p-4 md:px-8 lg:px-12 xl:px-28 rounded-md h-full w-full">
        <div className="grid grid-cols-2 gap-4">
          {userInfo.map((item) => (
            <div key={item.label} className="col-span-1">
              <Input
                label={item.label}
                type="text"
                className="mt-1 border-1 hover:border-background/30 rounded-xl w-full"
                value={item.value}
                name={item.name}
                onChange={handleChange}
                disabled={isEdit === false}
              />
            </div>
          ))}
          <div className="col-span-2 text-right">
            {isEdit === false ?
              <Button className="rounded-lg bg-transparent border-1 border-background dark:border-light hover:bg-primary hover:border-green-600 dark:hover:text-light transition ease-in-out duration-300" onClick={editDetails}>Edit</Button>
              :
              <div className="flex items-end justify-end gap-2">
                <Button className="rounded-lg bg-transparent border-1 hover:text-light border-background dark:border-light hover:bg-primary hover:border-red-600 dark:hover:text-light transition ease-in-out duration-300" onClick={cancelEditClick}>Cancel</Button>
                <Button className="rounded-lg bg-transparent border-1 hover:text-light border-background dark:border-light hover:bg-primary hover:border-green-600 dark:hover:text-light transition ease-in-out duration-300">Save Changes</Button>
              </div>
            }
          </div>
        </div>
      </motion.div>
    ),
    tab2: (
      <motion.div initial='hidden' animate='show' variants={fadeIn("", "", .1, 0.5)} className="bg-blue-200 m-4 p-4 rounded-md h-fit">
        <h2>Content for Tab 2</h2>
        <p>This is the content displayed when Tab 2 is active.</p>
      </motion.div>
    ),
    tab3: (
      <motion.div initial='hidden' animate='show' variants={fadeIn("", "", .1, 0.5)} className="bg-green-200 m-4 p-4 rounded-md h-fit">
        <h2>Content for Tab 3</h2>
        <p>This is the content displayed when Tab 3 is active.</p>
      </motion.div>
    ),
  };

  return (
    <>
      {/* <div className=" flex justify-center w-full gap-4 " style={{ height: 'calc(100vh - 120px)' }}> */}
      <div className=" flex justify-center w-full gap-4 min-h-full" >

        <motion.div initial='hidden' animate='show' variants={fadeIn("right", "spring", .1, 0.5)} className="bg-light dark:bg-secondary text-secondary dark:text-light rounded-lg shadow-lg w-1/4 border border-gray-200 " onClick={(e) => e.stopPropagation()}>

          <div className='p-1 flex flex-col items-center justify-center '>
            <LazyLoadImage src={profileBanner} alt="" className='rounded-lg w-full h-44 object-cover' />
            <LazyLoadImage src={profilePic} alt="" className='rounded-full w-32 top-[-60px]  relative shadow-black border-white border-3' />

          </div>


          <div className="relative top-[-40px] m-3">
            <div className=" flex align-baseline justify-between">
              <p className='text-xl text-center font-bold'>{user.firstName} {user.lastName}</p>
              <p className='text-base text-center font-semibold'>{user.email}</p>
            </div>

            <div className=" p-2 flex flex-col">

              {tabs.map((tab) => (
                <button
                  key={tab}
                  className="border rounded-md my-1 p-3 cursor-pointer"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* social links */}
            <ul className="list-none">
              {[
                { icon: 'globe', label: 'Website', value: 'https://bootdey.com' },
                { icon: 'github', label: 'Github', value: 'bootdey' },
                { icon: 'twitter', label: 'Twitter', value: '@bootdey' },
                { icon: 'instagram', label: 'Instagram', value: 'bootdey' },
                { icon: 'facebook', label: 'Facebook', value: 'bootdey' },
              ].map((item) => (
                <li key={item.label} className="flex justify-between items-center py-2">
                  <h6 className="flex items-center mb-0">
                    <i className={`fab fa-${item.icon} mr-2`}></i>{item.label}
                  </h6>
                  <span className="text-gray-600">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <div key={activeTab} className="flex relative z-20 overflow-hidden justify-center w-3/4 rounded-md ">
          {content[activeTab]}
        </div>
      </div>
    </>

  )
}

export default Profile



