import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import About from '../../pages/About-Us/About'
import Contact from '../../pages/Contact/Contact'
import Service from '../../pages/Service/Service'
import Project from '../../pages/Projects/Project'
import Teams from '../../pages/Teams/Teams'

function AppRoute() {
    return (
        <Routes>
            <Route>
                <Route path='/' element={<Home />} />
            </Route>
            <Route>
                <Route path='/about' element={<About />} />
            </Route>
            <Route>
                <Route path='/contact' element={<Contact />} />
            </Route>
            <Route>
                <Route path='/service' element={<Service />} />
            </Route>

            <Route>
                <Route path='/project' element={<Project />} />
            </Route>
            <Route>
                <Route path='/teams' element={<Teams />} />
            </Route>
            
        </Routes>
    )
}

export default AppRoute