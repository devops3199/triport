/*global kakao*/ 
import React from "react";
import styled from "styled-components";

const BoardWriteMap = (props) => {

    const { keyword, setAddress ,drag } = props;

    React.useEffect(() => {
        mapscript();
    }, [keyword]);

    const setLocation = (location) => {
        setAddress(location);
    };

    const mapscript = () => {
        const infowindow = new kakao.maps.InfoWindow({zIndex:1});

        const container = document.getElementById("Mymap");

        const options = {
          center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
          draggable : drag,
          level: 5,
        };

        //map
        const map = new kakao.maps.Map(container, options);

        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places(); 

        // 키워드로 장소를 검색합니다
        if(keyword !== "")
            ps.keywordSearch(keyword, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                let bounds = new kakao.maps.LatLngBounds();

                for (var i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            } 
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="display:flex; justify-content:center; width:200px;"><a href="' + place.place_url +'" target="_blank" style="padding:5px;font-size:14px;">'+ place.place_name + '</a></div>');
                setLocation(place.address_name);
                infowindow.open(map, marker);
                alert('위치 설정 완료');
            });
        }
    };

    return(
        <MapBlock id="Mymap"></MapBlock>
    );
};

const MapBlock = styled.div`
    width: 100%;
    height: 400px;
`;

export default BoardWriteMap;