let c = document.getElementById("canvas");
c.width = document.documentElement.clientWidth;
c.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");

const rad = 400;
let angle_phi = Math.PI/4;
let angle_theta = 0;
let model_type = "tetra";
function draw() {
    // background 
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.rect(-c.width/2, -c.height/2, c.width, c.height);
    ctx.fill();

    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#aaa";
    ctx.fillStyle = "white";


    switch(model_type) {
        case "tetra":
            draw_model(tetra_model(tetra_verts(rad*0.8, angle_theta, angle_phi)));
            break;
        case "cube":
            draw_model(cube_model(cube_verts(rad, angle_theta, angle_phi)));
            break;
        case "octa":
            draw_model(octa_model(octa_verts(rad, angle_theta, angle_phi)));
            break;
        case "dodeca":
            draw_model(dodeca_model(dodeca_verts(rad, angle_theta, angle_phi)));
            break;
        case "icosa":
            draw_model(icosa_model(icosa_verts(rad, angle_theta, angle_phi)));
            break;
    }
    
    angle_phi += 0.01;
    angle_theta += 0.02;
}

function draw_model(model) {
    for(let poly of model.polys) {
        draw_poly(poly);
    }
}

function draw_poly(poly) {
    // back-face culling
    if(back_face(poly)) {
        return;
    }

    // project tri vertices to plane
    let proj_poly = [];
    for(let point of poly) {
        proj_poly.push(project_point(point));
    }

    // draw projected vertices
    ctx.beginPath();
    ctx.moveTo(proj_poly[proj_poly.length - 1].x, proj_poly[proj_poly.length - 1].y);
    for(let point of proj_poly) {
        ctx.lineTo(point.x, point.y);
    }
    ctx.fill();
    ctx.stroke();
}

function project_point(point) {
    return new point_3d(
        point.x * (plane_z - focal_z) / (point.z - focal_z),
        point.y * (plane_z - focal_z) / (point.z - focal_z),
        plane_z
    );
}

function ortho_project_point(point) {
    return new point_3d(
        point.x,
        point.y,
        plane_z
    )
}

// if a face is backwards or not (check if ccw)
function back_face(poly) {
    let normal = cross_product(vec_diff(poly[1], poly[0]), vec_diff(poly[2], poly[0]));
    let final = dot_product(vec_diff(poly[0], focal_point), normal);
    // console.log(final);
    return final < 0;
}

function get_light(poly) {
    let normal = cross_product(vec_diff(poly[1], poly[0]), vec_diff(poly[2], poly[0]));
    let final = dot_product(vec_diff(poly[0], focal_point), normal);
    return final;
}

ctx.translate(c.width/2, c.height/2);
setInterval(draw, 17);