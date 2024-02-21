import React from 'react';
import imgican from './img/03d.png'
function SevenDay({ day, temp, contition, img_s }) {
    return (
        <div className='div1_sevenDay_main'>
            <div className='div2_sevenDay_main' >
                <main className='day'>
                    {day}
                </main>
                <main className='img_contition'>
                    <nav><img src={img_s} alt="" width='30' />{contition}</nav>
                </main>
                <main className='temp_seven'>
                    <span style={{ color: 'white' }} >+{temp}°</span>
                </main>
            </div>
        </div>
    );
}

export default SevenDay;