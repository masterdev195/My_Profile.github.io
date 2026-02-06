
class SinhVien {
    constructor(maSV, hoTen, ngaySinh, lopHoc, gpa) {
        this.maSV = maSV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lopHoc = lopHoc;
        this.gpa = parseFloat(gpa);
    }

    // Phương thức cập nhật thông tin
    updateInfo(data) {
        this.maSV = data.maSV;
        this.hoTen = data.hoTen;
        this.ngaySinh = data.ngaySinh;
        this.lopHoc = data.lopHoc;
        this.gpa = parseFloat(data.gpa);
    }
}

// Đối tượng điều khiển logic ứng dụng
const control = {
    list: [],

    // Lấy thông tin từ form
    getFormData() {
        return {
            maSV: document.getElementById('maSV').value.trim(),
            hoTen: document.getElementById('hoTen').value.trim(),
            ngaySinh: document.getElementById('ngaySinh').value,
            lopHoc: document.getElementById('lopHoc').value.trim(),
            gpa: document.getElementById('gpa').value
        };
    },

    // Thêm sinh viên mới
    addStudent() {
        const data = this.getFormData();
        if (!data.maSV || !data.hoTen) return alert("Tài ơi, nhập đủ Mã SV và Tên nhé!");

        const newSV = new SinhVien(data.maSV, data.hoTen, data.ngaySinh, data.lopHoc, data.gpa);
        this.list.push(newSV);
        this.render();
        this.reset();
    },

    // Hiển thị danh sách ra bảng
    render() {
        const tbody = document.querySelector('#studentTable tbody');
        tbody.innerHTML = '';
        this.list.forEach((sv, index) => {
            tbody.innerHTML += `
                <tr>
                    <td><b>${sv.maSV}</b></td>
                    <td>${sv.hoTen}</td>
                    <td>${sv.ngaySinh}</td>
                    <td>${sv.lopHoc}</td>
                    <td>${sv.gpa}</td>
                    <td>
                        <button class="btn-edit" onclick="control.edit(${index})">
                            <i class="fas fa-user-edit"></i> Sửa
                        </button>
                    </td>
                </tr>
            `;
        });
    },

    edit(index) {
        const sv = this.list[index];
        document.getElementById('maSV').value = sv.maSV;
        document.getElementById('hoTen').value = sv.hoTen;
        document.getElementById('ngaySinh').value = sv.ngaySinh;
        document.getElementById('lopHoc').value = sv.lopHoc;
        document.getElementById('gpa').value = sv.gpa;
        document.getElementById('editIndex').value = index;

        document.getElementById('btnAdd').style.display = 'none';
        document.getElementById('btnUpdate').style.display = 'block';
    },

    // Lưu sau khi sửa
    saveUpdate() {
        const index = document.getElementById('editIndex').value;
        const data = this.getFormData();
        this.list[index].updateInfo(data);
        this.render();
        this.reset();
        document.getElementById('btnAdd').style.display = 'block';
        document.getElementById('btnUpdate').style.display = 'none';
    },

    reset() {
        document.querySelectorAll('input').forEach(i => i.value = '');
    }
};
