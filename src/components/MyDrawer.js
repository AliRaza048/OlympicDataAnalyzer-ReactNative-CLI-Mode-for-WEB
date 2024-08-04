import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaMedal, FaChartLine, FaTh, FaMapMarkedAlt, FaUserAlt } from 'react-icons/fa';
import OlympicImage from '../../images/OlympicImage.png';
import { Image } from 'react-native';

// COMPONENTS IMPORT 
import MedalTallyTable from './MedalTallyTable';
import SingleLineGraph from './singleLineGraph';
import CountrywiseAnalysis from './countrywiseAnalysis';
import AthleteWiseAnalysis from './athletsWiseAnalysis';
import OverallAnalysisHeatMap from './overAllAnalysisHeatMap';

const MyNavbar = () => {
  return (
    <BrowserRouter>
      <Sidebar>
      <Image source={OlympicImage} style={{ width: '100%', height: '16vw', marginBottom: 10, borderBottom: '1px solid #8888' }} />

        <Title>Olympics Data Analyser</Title>
        <LinkStyle to="/"><FaMedal size={30} />Medal Tally</LinkStyle>
        <LinkStyle to="/analysis"><FaChartLine size={30} />Overall Analysis Chart</LinkStyle>
        <LinkStyle to="/overallanalysisheatmap"><FaTh size={30} />Overall Analysis HeatMap</LinkStyle>
        <LinkStyle to="/countrywise"><FaMapMarkedAlt size={30} />CountryWise Analysis</LinkStyle>
        <LinkStyle to="/athletsanalysis"><FaUserAlt size={30} />Athletes Analysis</LinkStyle>

      </Sidebar>
      <Content>
        <Routes>
          <Route exact path='/' element={<MedalTallyTable />} />
          <Route path='/analysis' element={<SingleLineGraph />} />
          <Route path='/countrywise' element={<CountrywiseAnalysis />} />
          <Route path='/athletsanalysis' element={<AthleteWiseAnalysis />} />
          <Route path='/overallanalysisheatmap' element={<OverallAnalysisHeatMap />} />
        </Routes>
      </Content>
    </BrowserRouter>
  );
};

const Sidebar = styled.div`
  width: 17%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  padding: 20px;
  border-right: 1px solid #BEBEBE;
  box-shadow: 1px 0px 8px 1px #BEBEBE;
  border-radius: 10px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Content = styled.div`
  margin-left: 22vw;
  padding: 1vw;
`;

const LinkStyle = styled(NavLink)`
  color: black;
  display: block;
  margin-bottom: 12px;
  text-decoration: none;
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  padding: 0 10px;

  &:hover {
    color: white;
    text-decoration: underline;
    background-color: black;
    border-radius: 10px;
  }

  &.active {
    color: white;
    background-color: black;
    box-shadow: 1px 0px 3px 1px black;
    border-radius: 10px;
  }
`;

export default MyNavbar;
