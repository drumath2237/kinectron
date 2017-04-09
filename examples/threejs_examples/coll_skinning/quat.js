					// pelvis - spine base 
					skeleton.bones[20].quaternion.x = data.joints[0].orientationX;
				  skeleton.bones[20].quaternion.y = data.joints[0].orientationY; 
				  skeleton.bones[20].quaternion.z = data.joints[0].orientationZ;
				  skeleton.bones[20].quaternion.w = data.joints[0].orientationW;

				  //head - head
				  skeleton.bones[0].quaternion.x = data.joints[3].orientationX;
				  skeleton.bones[0].quaternion.y = data.joints[3].orientationY; 
				  skeleton.bones[0].quaternion.z = data.joints[3].orientationZ;
				  skeleton.bones[0].quaternion.w = data.joints[3].orientationW;
					//neck - head
				  skeleton.bones[12].quaternion.x = data.joints[2].orientationX;
				  skeleton.bones[12].quaternion.y = data.joints[2].orientationY; 
				  skeleton.bones[12].quaternion.z = data.joints[2].orientationZ;
				  skeleton.bones[12].quaternion.w = data.joints[2].orientationW;
				  //spine - spine mid 
				  skeleton.bones[19].quaternion.x = data.joints[1].orientationX;
				  skeleton.bones[19].quaternion.y = data.joints[1].orientationY; 
				  skeleton.bones[19].quaternion.z = data.joints[1].orientationZ;
				  skeleton.bones[19].quaternion.w = data.joints[1].orientationW;

				  //l clavicle - shoulder left
				  skeleton.bones[11].quaternion.x = data.joints[4].orientationX;
				  skeleton.bones[11].quaternion.y = data.joints[4].orientationY; 
				  skeleton.bones[11].quaternion.z = data.joints[4].orientationZ;
				  skeleton.bones[11].quaternion.w = data.joints[4].orientationW;

				  // //l upperarm - shoulder left
				  skeleton.bones[10].quaternion.x = data.joints[4].orientationX;
				  skeleton.bones[10].quaternion.y = data.joints[4].orientationY; 
				  skeleton.bones[10].quaternion.z = data.joints[4].orientationZ;
				  skeleton.bones[10].quaternion.w = data.joints[4].orientationW;

				  //l forearm - elbow left 
				  skeleton.bones[9].quaternion.x = data.joints[5].orientationX;
				  skeleton.bones[9].quaternion.y = data.joints[5].orientationY; 
				  skeleton.bones[9].quaternion.z = data.joints[5].orientationZ;
				  skeleton.bones[9].quaternion.w = data.joints[5].orientationW;
				  
				  //l hand - hand left 
				  skeleton.bones[8].quaternion.x = data.joints[7].orientationX;
				  skeleton.bones[8].quaternion.y = data.joints[7].orientationY; 
				  skeleton.bones[8].quaternion.z = data.joints[7].orientationZ;
				  skeleton.bones[8].quaternion.w = data.joints[7].orientationW;


				  //r clavicle - shoulder right
				  skeleton.bones[6].quaternion.x = data.joints[8].orientationX;
				  skeleton.bones[6].quaternion.y = data.joints[8].orientationY; 
				  skeleton.bones[6].quaternion.z = data.joints[8].orientationZ;
				  skeleton.bones[6].quaternion.w = data.joints[8].orientationW;

				  // r upperarm - shoulder right
				  skeleton.bones[5].quaternion.x = data.joints[4].orientationX;
				  skeleton.bones[5].quaternion.y = data.joints[4].orientationY; 
				  skeleton.bones[5].quaternion.z = data.joints[4].orientationZ;
				  skeleton.bones[5].quaternion.w = data.joints[4].orientationW;

				  //r forearm - elbow right
				  skeleton.bones[4].quaternion.x = data.joints[9].orientationX;
				  skeleton.bones[4].quaternion.y = data.joints[9].orientationY; 
				  skeleton.bones[4].quaternion.z = data.joints[9].orientationZ;
				  skeleton.bones[4].quaternion.w = data.joints[9].orientationW;
				  
				  //r hand - hand right
				  skeleton.bones[3].quaternion.x = data.joints[11].orientationX;
				  skeleton.bones[3].quaternion.y = data.joints[11].orientationY; 
				  skeleton.bones[3].quaternion.z = data.joints[11].orientationZ;
				  skeleton.bones[3].quaternion.w = data.joints[11].orientationW;

				  //l thigh - hip left
				  skeleton.bones[18].quaternion.x = data.joints[12].orientationX;
				  skeleton.bones[18].quaternion.y = data.joints[12].orientationY; 
				  skeleton.bones[18].quaternion.z = data.joints[12].orientationZ;
				  skeleton.bones[18].quaternion.w = data.joints[12].orientationW;

				  //l calf - knee left
				  skeleton.bones[17].quaternion.x = data.joints[13].orientationX;
				  skeleton.bones[17].quaternion.y = data.joints[13].orientationY; 
				  skeleton.bones[17].quaternion.z = data.joints[13].orientationZ;
				  skeleton.bones[17].quaternion.w = data.joints[13].orientationW;

				  //l foot - ankleleft
				  skeleton.bones[16].quaternion.x = data.joints[14].orientationX;
				  skeleton.bones[16].quaternion.y = data.joints[14].orientationY; 
				  skeleton.bones[16].quaternion.z = data.joints[14].orientationZ;
				  skeleton.bones[16].quaternion.w = data.joints[14].orientationW;

				  //l toe - footleft
				  skeleton.bones[2].quaternion.x = data.joints[15].orientationX;
				  skeleton.bones[2].quaternion.y = data.joints[15].orientationY; 
				  skeleton.bones[2].quaternion.z = data.joints[15].orientationZ;
				  skeleton.bones[2].quaternion.w = data.joints[15].orientationW;

			  	//r thigh - hip right
				  skeleton.bones[15].quaternion.x = data.joints[16].orientationX;
				  skeleton.bones[15].quaternion.y = data.joints[16].orientationY; 
				  skeleton.bones[15].quaternion.z = data.joints[16].orientationZ;
				  skeleton.bones[15].quaternion.w = data.joints[16].orientationW;

				  //r calf - knee right
				  skeleton.bones[14].quaternion.x = data.joints[17].orientationX;
				  skeleton.bones[14].quaternion.y = data.joints[17].orientationY; 
				  skeleton.bones[14].quaternion.z = data.joints[17].orientationZ;
				  skeleton.bones[14].quaternion.w = data.joints[17].orientationW;

				  //r foot - ankle right
				  skeleton.bones[13].quaternion.x = data.joints[18].orientationX;
				  skeleton.bones[13].quaternion.y = data.joints[18].orientationY; 
				  skeleton.bones[13].quaternion.z = data.joints[18].orientationZ;
				  skeleton.bones[13].quaternion.w = data.joints[18].orientationW;

				  //r toe - foot right
				  skeleton.bones[7].quaternion.x = data.joints[19].orientationX;
				  skeleton.bones[7].quaternion.y = data.joints[19].orientationY; 
				  skeleton.bones[7].quaternion.z = data.joints[19].orientationZ;
				  skeleton.bones[7].quaternion.w = data.joints[19].orientationW;