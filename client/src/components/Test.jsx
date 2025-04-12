import { LazyLoadImage } from 'react-lazy-load-image-component'
import '../styleSheets/test.css'
import Footer from '../client/Footer'
function Test() {
    return (
        <>
            {/* <button className="button-86" role="button">Button 86</button> */}
            {/* <button className="button-57" role="button"><span className="text">Button 57</span><span>Button 57</span></button> */}

            {/* <div className='bg-blue-200 h-screen '>
                <div className='h-96 w-96 bg-green-300 text-background flex items-center justify-center'>
                    <LazyLoadImage src="http://localhost:8080/uploads/userProfilePicture/4545202412310504.jpg" alt="img" srcset="" />
                </div>
                <button className="button-48" role="button"><span className="s">Button 48</span></button>
            </div> */}
            <Footer />

        </>
    )
}

export default Test