var viewer;
export function init_potree(url, ratio, direction) {
	viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
	viewer.setEDLEnabled(false);
	viewer.setFOV(60);
	viewer.setPointBudget(1_000_000);
	viewer.loadSettingsFromURL();
	viewer.setBackground("skybox");
	load_points(url, ratio, direction)
}

export function load_points(url, ratio, direction) {
	Potree.loadPointCloud(url, "PointCloud", e => {
		let scene = viewer.scene;
		let pointcloud = e.pointcloud;

		let material = pointcloud.material;
		material.size = 1;
		material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
		material.shape = Potree.PointShape.SQUARE;

		scene.addPointCloud(pointcloud);

		viewer.fitToScreen();
    })
}

//设置视角
export function setView(directiion) {
	viewer.setView(directiion)
}

//旋转
export function rotate(axis, angle) {
	switch (axis) {
		case "x":
			viewer.scene.scenePointCloud.rotateX(angle)
			break
		case "y":
			viewer.scene.scenePointCloud.rotateY(angle)
			break
		case "z":
			viewer.scene.scenePointCloud.rotateZ(angle)
			break
    }	
}
//自身坐标相对位置平移
export function translate(axis, distance) {
	switch (axis) {
		case "x":
			viewer.scene.view.translate(distance,0,0)
			break
		case "y":
			viewer.scene.view.translate(0,distance,0)
			break
		case "z":
			viewer.scene.view.translate(0,0,distance)
			break
	}
}
//世界坐标相对位置平移
export function translateWorld(axis, distance) {
	switch (axis) {
		case "x":
			viewer.scene.view.translateWorld(distance, 0, 0)
			break
		case "y":
			viewer.scene.view.translateWorld(0, distance, 0)
			break
		case "z":
			viewer.scene.view.translateWorld(0, 0, distance)
			break
	}
}
//放大缩小
export function zoom(ratio) {
	viewer.scene.getActiveCamera().zoom=ratio
}