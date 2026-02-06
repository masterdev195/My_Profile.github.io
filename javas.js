class SinhVien {
    constructor(maSV, hoTen, ngaySinh, lopHoc, gpa) {
        this.maSV = maSV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lopHoc = lopHoc;
        this.gpa = parseFloat(gpa);
    }

    updateInfo(newInfo) {
        this.maSV = newInfo.maSV;
        this.hoTen = newInfo.hoTen;
        this.ngaySinh = newInfo.ngaySinh;
        this.lopHoc = newInfo.lopHoc;
        this.gpa = parseFloat(newInfo.gpa);
    }
}

const control = {
    students: [],

    addStudent() {
        const info = this.getInputValues();
        if (!info.maSV || !info.hoTen) {
            alert("Vui lòng điền ít nhất Mã SV và Họ Tên!");
            return;
        }

        const sv = new SinhVien(info.maSV, info.hoTen, info.ngaySinh, info.lopHoc, info.gpa);
        this.students.push(sv);
        this.render();
        this.clearForm();
    },

    render() {
        const tbody = document.querySelector("#studentTable tbody");
        tbody.innerHTML = "";
        this.students.forEach((sv, index) => {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${sv.maSV}</strong></td>
                    <td>${sv.hoTen}</td>
                    <td>${sv.ngaySinh}</td>
                    <td>${sv.lopHoc}</td>
                    <td><span class="badge">${sv.gpa}</span></td>
                    <td class="action-btns">
                        <button class="btn btn-warning btn-sm" onclick="control.editStudent(${index})">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                    </td>
                </tr>
            `;
        });
    },

    editStudent(index) {
        const sv = this.students[index];
        document.getElementById("maSV").value = sv.maSV;
        document.getElementById("hoTen").value = sv.hoTen;
        document.getElementById("ngaySinh").value = sv.ngaySinh;
        document.getElementById("lopHoc").value = sv.lopHoc;
        document.getElementById("gpa").value = sv.gpa;
        document.getElementById("editIndex").value = index;

        document.getElementById("btnAdd").style.display = "none";
        document.getElementById("btnUpdate").style.display = "flex";
    },

    saveUpdate() {
        const index = document.getElementById("editIndex").value;
        const info = this.getInputValues();
        
        this.students[index].updateInfo(info);
        
        this.render();
        this.clearForm();
        document.getElementById("btnAdd").style.display = "flex";
        document.getElementById("btnUpdate").style.display = "none";
    },

    getInputValues() {
        return {
            maSV: document.getElementById("maSV").value,
            hoTen: document.getElementById("hoTen").value,
            ngaySinh: document.getElementById("ngaySinh").value,
            lopHoc: document.getElementById("lopHoc").value,
            gpa: document.getElementById("gpa").value
        };
    },

    clearForm() {
        document.querySelectorAll(".form-card input").forEach(i => i.value = "");
    }
};
