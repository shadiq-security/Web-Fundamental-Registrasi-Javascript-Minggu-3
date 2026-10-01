document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    // Mengambil elemen input berdasarkan ID
    const inputs = {
        username: document.getElementById('username'),
        password: document.getElementById('password'),
        nama: document.getElementById('nama'),
        tanggalLahir: document.getElementById('tanggal_lahir'),
        alamat: document.getElementById('alamat'),
        telepon: document.getElementById('telepon')
    };

    // Event Handling saat form disubmit
    form.addEventListener('submit', (e) => {
        let isValid = true;

        // Reset semua status error terlebih dahulu
        resetAllErrors();

        
        // a. Validasi Username: tidak boleh kosong & panjang minimal 3
        const usernameVal = inputs.username.value.trim();
        if (usernameVal === '') {
            showError('username', 'Username tidak boleh kosong!');
            isValid = false;
        } else if (usernameVal.length < 3) {
            showError('username', 'Username minimal 3 karakter!');
            isValid = false;
        }

        
        // b. Validasi Password: tidak boleh kosong & panjang minimal 8
        const passwordVal = inputs.password.value;
        if (passwordVal.trim() === '') {
            showError('password', 'Password tidak boleh kosong!');
            isValid = false;
        } else if (passwordVal.length < 8) {
            showError('password', 'Password minimal 8 karakter!');
            isValid = false;
        }

        
        // c. Validasi Nama: tidak boleh kosong
        const namaVal = inputs.nama.value.trim();
        if (namaVal === '') {
            showError('nama', 'Nama tidak boleh kosong!');
            isValid = false;
        }

        
        // d. Validasi Tanggal Lahir: tidak boleh kosong & tidak boleh future date
        //    (Maksimal tanggal hari ini / tidak boleh lebih dari hari ini)
        const dateVal = inputs.tanggalLahir.value;
        if (dateVal === '') {
            showError('tanggal_lahir', 'Tanggal lahir tidak boleh kosong!');
            isValid = false;
        } else {
            const selectedDate = new Date(dateVal);
            const today = new Date();
            // Atur waktu hari ini ke akhir hari (23:59:59) agar tanggal hari ini tetap valid saat dibandingkan
            today.setHours(23, 59, 59, 999);

            if (selectedDate > today) {
                showError('tanggal_lahir', 'Tanggal lahir tidak boleh di masa depan (maksimal hari ini)!');
                isValid = false;
            }
        }

        
        // e. Validasi Alamat: tidak boleh kosong
        const alamatVal = inputs.alamat.value.trim();
        if (alamatVal === '') {
            showError('alamat', 'Alamat tidak boleh kosong!');
            isValid = false;
        }

        
        // f. Validasi Nomor Telepon: tidak boleh kosong & berawal dari +62
        const teleponVal = inputs.telepon.value.trim();
        if (teleponVal === '') {
            showError('telepon', 'Nomor telepon tidak boleh kosong!');
            isValid = false;
        } else if (!teleponVal.startsWith('+62')) {
            showError('telepon', 'Nomor telepon harus diawali dengan +62');
            isValid = false;
        }

        // Jika ada input yang tidak valid, cegah pengiriman form ke dashboard.html
        if (!isValid) {
            e.preventDefault();
        }
    });

    
    // Real-time Event Handling: Menghapus pesan error ketika user mulai mengetik ulang
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (input) {
            input.addEventListener('input', () => {
                clearError(input.id);
            });
        }
    });

    // Helper Function: Menampilkan Pesan Error & Highlight Input
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorP = document.getElementById(`error-${fieldId}`);
        
        if (input) {
            input.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            input.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
        }
        
        if (errorP) {
            const spanText = errorP.querySelector('span');
            if (spanText) spanText.textContent = message;
            errorP.classList.remove('hidden');
        }
    }

    // Helper Function: Clear Pesan Error
    function clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorP = document.getElementById(`error-${fieldId}`);

        if (input) {
            input.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            input.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
        }

        if (errorP) {
            errorP.classList.add('hidden');
        }
    }

    // Helper Function: Reset Semua Error
    function resetAllErrors() {
        ['username', 'password', 'nama', 'tanggal_lahir', 'alamat', 'telepon'].forEach(id => clearError(id));
    }
});