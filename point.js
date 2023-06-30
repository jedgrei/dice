function point_3d(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function model_3d() {
    this.polys = [];
    this.add_poly = (...points) => {
        this.polys.push(points);
    };
}

const focal_z = 1000;
let focal_point = new point_3d(0, 0, focal_z);
const plane_z = 500;

// radius,angle,z -> x,y,z
function cyl_to_rect(r, a, y) {
    return new point_3d(
        r * Math.cos(a),
        y,
        r * Math.sin(a)
    )
}

// rad,theta,phi -> x,y,z
// theta=zenith angle, phi=azimunth angle
function spr_to_rect(r, t, p) {
    // get complement of t
    let t1 = Math.PI/2 - t;
    return new point_3d(
        r * Math.sin(t1) * Math.cos(p),
        r * Math.cos(t1),
        r * Math.sin(t1) * Math.sin(p)
    )
}

function dot_product(v0, v1) {
    return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
}

function cross_product(v0, v1) {
    return new point_3d(
        v0.y * v1.z - v0.z * v1.y,
        v0.z * v1.x - v0.x * v1.z,
        v0.x * v1.y - v0.y * v1.x
    );
}

function vec_sum(v0, v1) {
    return new point_3d(
        v0.x + v1.x,
        v0.y + v1.y,
        v0.z + v1.z
    );
}

function vec_neg(v) {
    return new point_3d(-v.x, -v.y, -v.z);
}

function vec_diff(v0, v1) {
    return vec_sum(v0, vec_neg(v1));
}

// pitch is around x, yaw is around y
function rotate_point(point, pitch, yaw) {
    // rotate around pitch
    let pitch_rad = Math.sqrt(Math.pow(point.y, 2) + Math.pow(point.z, 2));
    let curr_pitch = Math.atan2(point.y, point.z);
    point = new point_3d(
        point.x,
        pitch_rad * Math.sin(curr_pitch + pitch),
        pitch_rad * Math.cos(curr_pitch + pitch),
    );

    // rotate around yaw
    let yaw_rad = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.z, 2));
    let curr_yaw = Math.atan2(point.z, point.x);
    point = new point_3d(
        yaw_rad * Math.cos(curr_yaw + yaw),
        point.y,
        yaw_rad * Math.sin(curr_yaw + yaw),
    );
    return point;
}