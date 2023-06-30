// tetrahedron
function tetra_verts(rad, theta, phi) {
    let vertices = [];
    let low_theta = Math.PI/2 - Math.acos(1/3);

    // north pole
    vertices.push(spr_to_rect(rad, -Math.PI/2, 0));

    for(let i = 0; i < 3; ++i) {
        vertices.push(spr_to_rect(rad, low_theta, i*Math.PI*2/3));
    }

    for(let i = 0; i < 4; ++i) {
        vertices[i] = rotate_point(vertices[i], theta, phi);
    }

    return vertices;
}

function tetra_model(vertices) {
    let tetra = new model_3d();

    tetra.add_poly(vertices[0], vertices[2], vertices[1]);
    tetra.add_poly(vertices[0], vertices[3], vertices[2]);
    tetra.add_poly(vertices[0], vertices[1], vertices[3]);
    tetra.add_poly(vertices[1], vertices[2], vertices[3]);

    return tetra;
}

// hexahedron
function cube_verts(rad, theta, phi) {
    let vertices = [];
    for(let i = 0; i < 4; ++i) {
        vertices.push(spr_to_rect(rad,  Math.atan2(1, Math.sqrt(2)),  (i*Math.PI/2)));
        vertices.push(spr_to_rect(rad,  -Math.atan2(1, Math.sqrt(2)), (i*Math.PI/2)));
    }
    for(let i = 0; i < 8; ++i) {
        vertices[i] = rotate_point(vertices[i], theta, phi);
    }
    return vertices;
}

function cube_model(vertices) {
    let cube = new model_3d();
    
    cube.add_poly(
        vertices[0],
        vertices[1],
        vertices[3],
        vertices[2]
    );

    cube.add_poly(
        vertices[2],
        vertices[3],
        vertices[5],
        vertices[4]
    );
    
    cube.add_poly(
        vertices[4],
        vertices[5],
        vertices[7],
        vertices[6]
    );
    
    cube.add_poly(
        vertices[6],
        vertices[7],
        vertices[1],
        vertices[0]
    );
    
    cube.add_poly(
        vertices[0],
        vertices[2],
        vertices[4],
        vertices[6]
    );

    cube.add_poly(
        vertices[7],
        vertices[5],
        vertices[3],
        vertices[1]
    );

    return cube;
}

// octahedron
function octa_verts(rad, theta, phi) {
    let vertices = [];

    // north pole
    vertices.push(spr_to_rect(rad, -Math.PI/2, 0));

    // middle ring
    for(let i = 0; i < 4; ++i) {
        vertices.push(spr_to_rect(rad, 0, (i * Math.PI/2)));
    }

    // south pole
    vertices.push(spr_to_rect(rad, Math.PI/2, 0));

    // rotate
    for(let i = 0; i < 6; ++i) {
        vertices[i] = rotate_point(vertices[i], theta, phi);
    }

    return vertices;
}

function octa_model(vertices) {
    let octa = new model_3d();

    // top pyramid
    octa.add_poly(vertices[0], vertices[2], vertices[1]);
    octa.add_poly(vertices[0], vertices[3], vertices[2]);
    octa.add_poly(vertices[0], vertices[4], vertices[3]);
    octa.add_poly(vertices[0], vertices[1], vertices[4]);

    // bottom pyramid
    octa.add_poly(vertices[5], vertices[1], vertices[2]);
    octa.add_poly(vertices[5], vertices[2], vertices[3]);
    octa.add_poly(vertices[5], vertices[3], vertices[4]);
    octa.add_poly(vertices[5], vertices[4], vertices[1]);

    return octa;
}

// dodecahedron
function dodeca_verts(rad, theta, phi) {
    let vertices = [];
    const sqrt5 = Math.sqrt(5);
    const highest_theta = -Math.atan((3+sqrt5)/4);
    const high_theta = -Math.atan((3-sqrt5)/4);
    const low_theta = Math.atan((3-sqrt5)/4);
    const lowest_theta = Math.atan((3+sqrt5)/4);

    // 4 rings
    for(let i = 0; i < 5; ++i) {
        vertices.push(spr_to_rect(rad, highest_theta, (i*Math.PI*2/5)));
        vertices.push(spr_to_rect(rad, high_theta, (i*Math.PI*2/5)));
        vertices.push(spr_to_rect(rad, low_theta, ((i+0.5)*Math.PI*2/5)));
        vertices.push(spr_to_rect(rad, lowest_theta, ((i+0.5)*Math.PI*2/5)));
    }

    // rotate
    for(let i = 0; i < 20; ++i) {
        vertices[i] = rotate_point(vertices[i], theta, phi);
    }

    return vertices;
}

function dodeca_model(vertices) {
    let dodeca = new model_3d();

    dodeca.add_poly(vertices[0], vertices[16], vertices[12], vertices[8], vertices[4]);
    
    dodeca.add_poly(vertices[0], vertices[4], vertices[5], vertices[2], vertices[1]);
    dodeca.add_poly(vertices[4], vertices[8], vertices[9], vertices[6], vertices[5]);
    dodeca.add_poly(vertices[8], vertices[12], vertices[13], vertices[10], vertices[9]);
    dodeca.add_poly(vertices[12], vertices[16], vertices[17], vertices[14], vertices[13]);
    dodeca.add_poly(vertices[16], vertices[0], vertices[1], vertices[18], vertices[17]);

    dodeca.add_poly(vertices[2], vertices[5], vertices[6], vertices[7], vertices[3]);
    dodeca.add_poly(vertices[6], vertices[9], vertices[10], vertices[11], vertices[7]);
    dodeca.add_poly(vertices[10], vertices[13], vertices[14], vertices[15], vertices[11]);
    dodeca.add_poly(vertices[14], vertices[17], vertices[18], vertices[19], vertices[15]);
    dodeca.add_poly(vertices[18], vertices[1], vertices[2], vertices[3], vertices[19]);

    dodeca.add_poly(vertices[3], vertices[7], vertices[11], vertices[15], vertices[19]);

    return dodeca;
}

// icosahedron
function icosa_verts(rad, theta, phi) {
    let vertices = [];
    const high_theta = -Math.atan(1/2);
    const low_theta = Math.atan(1/2);

    // north pole
    vertices.push(spr_to_rect(rad, -Math.PI/2, 0));

    // middle ring
    for(let i = 0; i < 5; ++i) {
        vertices.push(spr_to_rect(rad, high_theta, (i*Math.PI*2/5)));
        vertices.push(spr_to_rect(rad, low_theta, ((i+0.5)*Math.PI*2/5)));
    }

    // south pole
    vertices.push(spr_to_rect(rad, Math.PI/2, 0));

    // rotate
    for(let i = 0; i < 12; ++i) {
        vertices[i] = rotate_point(vertices[i], theta, phi);
    }

    return vertices;
}

function icosa_model(vertices) {
    let icosa = new model_3d();

    // top pyramid
    icosa.add_poly(vertices[0], vertices[3], vertices[1]);
    icosa.add_poly(vertices[0], vertices[5], vertices[3]);
    icosa.add_poly(vertices[0], vertices[7], vertices[5]);
    icosa.add_poly(vertices[0], vertices[9], vertices[7]);
    icosa.add_poly(vertices[0], vertices[1], vertices[9]);

    // flat-top ring
    icosa.add_poly(vertices[1], vertices[3], vertices[2]);
    icosa.add_poly(vertices[3], vertices[5], vertices[4]);
    icosa.add_poly(vertices[5], vertices[7], vertices[6]);
    icosa.add_poly(vertices[7], vertices[9], vertices[8]);
    icosa.add_poly(vertices[9], vertices[1], vertices[10]);

    // point-top ring
    icosa.add_poly(vertices[4], vertices[2], vertices[3]);
    icosa.add_poly(vertices[6], vertices[4], vertices[5]);
    icosa.add_poly(vertices[8], vertices[6], vertices[7]);
    icosa.add_poly(vertices[10], vertices[8], vertices[9]);
    icosa.add_poly(vertices[2], vertices[10], vertices[1]);

    // bottom pyramid
    icosa.add_poly(vertices[11], vertices[2], vertices[4]);
    icosa.add_poly(vertices[11], vertices[4], vertices[6]);
    icosa.add_poly(vertices[11], vertices[6], vertices[8]);
    icosa.add_poly(vertices[11], vertices[8], vertices[10]);
    icosa.add_poly(vertices[11], vertices[10], vertices[2]);
    
    return icosa;
}