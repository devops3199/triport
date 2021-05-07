/*global kakao*/ 
import React from "react";
import styled from "styled-components";

const BoardDetailMap = (props) => {
    const { address } = props;

    React.useEffect(() => {
        mapscript();
    }, []);

    const mapscript = () => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                draggable: false,
                level: 3 // 지도의 확대 레벨
            };  

        // 지도를 생성합니다    
        const map = new kakao.maps.Map(mapContainer, mapOption); 

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                console.log(result);

                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">' + result[0].address_name + '</div>'
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });    
    };

    return(
        <MapBlock id="map"></MapBlock>
    );
};

const MapBlock = styled.div`
    width: 100%;
    height: 300px;
`;

export default BoardDetailMap;