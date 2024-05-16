import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PostManager {
    private List<Post> posts;
    private List<BlacklistItem> blacklist;

    public PostManager() {
        this.posts = new ArrayList<>();
        this.blacklist = new ArrayList<>();
    }

    public void cadastrarPost(int idUsuario, String titulo, String descricao, String tipoGolpe, String link, boolean publico) {
        Post novoPost = new Post(getNextPostId(), idUsuario, titulo, descricao, tipoGolpe, link, publico, new Date());
        posts.add(novoPost);
        if (publico) {
            adicionarBlacklist(novoPost);
        }
        System.out.println("Post cadastrado com sucesso!");
    }

    private int getNextPostId() {
        return posts.isEmpty() ? 1 : posts.get(posts.size() - 1).getId() + 1;
    }

    private void adicionarBlacklist(Post post) {
        BlacklistItem novoItem = new BlacklistItem(post.getId(), post.getDataPost(), post.getLink(), post.getDescricao());
        blacklist.add(novoItem);
        System.out.println("Link adicionado à blacklist com sucesso!");
    }

    // Métodos getters e setters
    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<BlacklistItem> getBlacklist() {
        return blacklist;
    }

    public void setBlacklist(List<BlacklistItem> blacklist) {
        this.blacklist = blacklist;
    }
}

class Post {
    private int id;
    private int idUsuario;
    private String titulo;
    private String descricao;
    private String tipoGolpe;
    private String link;
    private boolean publico;
    private Date dataPost;

    public Post(int id, int idUsuario, String titulo, String descricao, String tipoGolpe, String link, boolean publico, Date dataPost) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoGolpe = tipoGolpe;
        this.link = link;
        this.publico = publico;
        this.dataPost = dataPost;
    }

    // Métodos getters e setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTipoGolpe() {
        return tipoGolpe;
    }

    public void setTipoGolpe(String tipoGolpe) {
        this.tipoGolpe = tipoGolpe;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public boolean isPublico() {
        return publico;
    }

    public void setPublico(boolean publico) {
        this.publico = publico;
    }

    public Date getDataPost() {
        return dataPost;
    }

    public void setDataPost(Date dataPost) {
        this.dataPost = dataPost;
    }
}

class BlacklistItem {
    private int id;
    private Date data;
    private String link;
    private String descricao;

    public BlacklistItem(int id, Date data, String link, String descricao) {
        this.id = id;
        this.data = data;
        this.link = link;
        this.descricao = descricao;
    }

    // Métodos getters e setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}